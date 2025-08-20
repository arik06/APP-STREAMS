const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const readline = require('readline');

// Crear interfaz de lectura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Conectar a la base de datos
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    process.exit(1);
  }
  console.log('✅ Conectado a la base de datos SQLite');
  startEditing();
});

function startEditing() {
  console.log('\n🔧 EDITOR DE USUARIOS');
  console.log('========================\n');
  
  // Mostrar usuarios existentes
  db.all('SELECT id, username, created_at FROM users ORDER BY id', (err, users) => {
    if (err) {
      console.error('Error obteniendo usuarios:', err);
      rl.close();
      return;
    }
    
    if (users.length === 0) {
      console.log('❌ No hay usuarios en la base de datos');
      rl.close();
      return;
    }
    
    console.log('👥 USUARIOS EXISTENTES:');
    users.forEach(user => {
      console.log(`ID: ${user.id} | Usuario: ${user.username} | Creado: ${user.created_at}`);
    });
    
    console.log('\n📝 ¿QUÉ QUIERES HACER?');
    console.log('1. Cambiar nombre de usuario');
    console.log('2. Cambiar contraseña de usuario');
    console.log('3. Crear nuevo usuario');
    console.log('4. Salir');
    
    rl.question('\nSelecciona una opción (1-4): ', (answer) => {
      switch(answer.trim()) {
        case '1':
          changeUsername();
          break;
        case '2':
          changePassword();
          break;
        case '3':
          createUser();
          break;
        case '4':
          console.log('👋 ¡Hasta luego!');
          rl.close();
          break;
        default:
          console.log('❌ Opción inválida');
          startEditing();
      }
    });
  });
}

function changeUsername() {
  console.log('\n🔄 CAMBIAR NOMBRE DE USUARIO');
  console.log('===============================\n');
  
  rl.question('Ingresa el ID del usuario a editar: ', (userId) => {
    const id = parseInt(userId);
    
    if (isNaN(id)) {
      console.log('❌ ID inválido');
      startEditing();
      return;
    }
    
    // Verificar que el usuario existe
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
      if (err) {
        console.error('Error verificando usuario:', err);
        startEditing();
        return;
      }
      
      if (!user) {
        console.log('❌ Usuario no encontrado');
        startEditing();
        return;
      }
      
      console.log(`\n👤 Usuario actual: ${user.username}`);
      
      rl.question('Ingresa el nuevo nombre de usuario: ', (newUsername) => {
        if (!newUsername.trim()) {
          console.log('❌ El nombre de usuario no puede estar vacío');
          startEditing();
          return;
        }
        
        // Verificar que el nuevo nombre no esté en uso
        db.get('SELECT * FROM users WHERE username = ? AND id != ?', [newUsername.trim(), id], (err, existingUser) => {
          if (err) {
            console.error('Error verificando nombre:', err);
            startEditing();
            return;
          }
          
          if (existingUser) {
            console.log('❌ El nombre de usuario ya está en uso');
            startEditing();
            return;
          }
          
          // Actualizar el nombre de usuario
          db.run('UPDATE users SET username = ? WHERE id = ?', [newUsername.trim(), id], function(err) {
            if (err) {
              console.error('Error actualizando usuario:', err);
              startEditing();
              return;
            }
            
            console.log(`✅ Usuario actualizado exitosamente`);
            console.log(`   ID: ${id}`);
            console.log(`   Nombre anterior: ${user.username}`);
            console.log(`   Nombre nuevo: ${newUsername.trim()}`);
            
            rl.question('\n¿Quieres hacer otro cambio? (s/n): ', (answer) => {
              if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'si') {
                startEditing();
              } else {
                console.log('👋 ¡Hasta luego!');
                rl.close();
              }
            });
          });
        });
      });
    });
  });
}

function changePassword() {
  console.log('\n🔐 CAMBIAR CONTRASEÑA DE USUARIO');
  console.log('==================================\n');
  
  rl.question('Ingresa el ID del usuario: ', (userId) => {
    const id = parseInt(userId);
    
    if (isNaN(id)) {
      console.log('❌ ID inválido');
      startEditing();
      return;
    }
    
    // Verificar que el usuario existe
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
      if (err) {
        console.error('Error verificando usuario:', err);
        startEditing();
        return;
      }
      
      if (!user) {
        console.log('❌ Usuario no encontrado');
        startEditing();
        return;
      }
      
      console.log(`👤 Usuario: ${user.username}`);
      
      rl.question('Ingresa la nueva contraseña: ', (newPassword) => {
        if (!newPassword.trim()) {
          console.log('❌ La contraseña no puede estar vacía');
          startEditing();
          return;
        }
        
        // Hashear la nueva contraseña
        bcrypt.hash(newPassword.trim(), 10, (err, hashedPassword) => {
          if (err) {
            console.error('Error hasheando contraseña:', err);
            startEditing();
            return;
          }
          
          // Actualizar la contraseña
          db.run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id], function(err) {
            if (err) {
              console.error('Error actualizando contraseña:', err);
              startEditing();
              return;
            }
            
            console.log(`✅ Contraseña actualizada exitosamente`);
            console.log(`   Usuario: ${user.username}`);
            
            rl.question('\n¿Quieres hacer otro cambio? (s/n): ', (answer) => {
              if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'si') {
                startEditing();
              } else {
                console.log('👋 ¡Hasta luego!');
                rl.close();
              }
            });
          });
        });
      });
    });
  });
}

function createUser() {
  console.log('\n➕ CREAR NUEVO USUARIO');
  console.log('=======================\n');
  
  rl.question('Ingresa el nombre de usuario: ', (username) => {
    if (!username.trim()) {
      console.log('❌ El nombre de usuario no puede estar vacío');
      startEditing();
      return;
    }
    
    // Verificar que el nombre no esté en uso
    db.get('SELECT * FROM users WHERE username = ?', [username.trim()], (err, existingUser) => {
      if (err) {
        console.error('Error verificando usuario:', err);
        startEditing();
        return;
      }
      
      if (existingUser) {
        console.log('❌ El nombre de usuario ya está en uso');
        startEditing();
        return;
      }
      
      rl.question('Ingresa la contraseña: ', (password) => {
        if (!password.trim()) {
          console.log('❌ La contraseña no puede estar vacía');
          startEditing();
          return;
        }
        
        // Hashear la contraseña
        bcrypt.hash(password.trim(), 10, (err, hashedPassword) => {
          if (err) {
            console.error('Error hasheando contraseña:', err);
            startEditing();
            return;
          }
          
          // Crear el usuario
          db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username.trim(), hashedPassword], function(err) {
            if (err) {
              console.error('Error creando usuario:', err);
              startEditing();
              return;
            }
            
            console.log(`✅ Usuario creado exitosamente`);
            console.log(`   ID: ${this.lastID}`);
            console.log(`   Usuario: ${username.trim()}`);
            
            rl.question('\n¿Quieres hacer otro cambio? (s/n): ', (answer) => {
              if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'si') {
                startEditing();
              } else {
                console.log('👋 ¡Hasta luego!');
                rl.close();
              }
            });
          });
        });
      });
    });
  });
}

// Manejar cierre del programa
process.on('SIGINT', () => {
  console.log('\n👋 ¡Hasta luego!');
  rl.close();
  process.exit(0);
});
