const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    process.exit(1);
  } else {
    console.log('✅ Conectado a la base de datos SQLite');
    showUsers();
  }
});

function showUsers() {
  console.log('\n📋 USUARIOS EN LA BASE DE DATOS');
  console.log('==================================\n');
  
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
    
    users.forEach(user => {
      console.log(`   ID: ${user.id} | Usuario: ${user.username} | Creado: ${user.created_at}`);
    });
    
    console.log('\n🗑️  BORRAR USUARIOS');
    console.log('===================\n');
    
    rl.question('Ingresa los IDs de los usuarios a borrar (separados por comas, ej: 1,2,3): ', (answer) => {
      const ids = answer.split(',').map(id => id.trim()).filter(id => id !== '');
      
      if (ids.length === 0) {
        console.log('❌ No ingresaste ningún ID');
        rl.close();
        return;
      }
      
      // Convertir a números
      const numericIds = ids.map(id => parseInt(id)).filter(id => !isNaN(id));
      
      if (numericIds.length === 0) {
        console.log('❌ No hay IDs válidos');
        rl.close();
        return;
      }
      
      // Borrar usuarios
      let deleted = 0;
      let errors = 0;
      
      numericIds.forEach(id => {
        db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
          if (err) {
            console.error(`❌ Error borrando usuario ID ${id}:`, err.message);
            errors++;
          } else if (this.changes > 0) {
            console.log(`✅ Usuario ID ${id} borrado exitosamente`);
            deleted++;
          } else {
            console.log(`⚠️  Usuario ID ${id} no encontrado`);
            errors++;
          }
          
          // Cuando terminen todas las operaciones
          if (deleted + errors === numericIds.length) {
            console.log(`\n📊 Resumen: ${deleted} usuario(s) borrado(s)`);
            rl.close();
            db.close();
          }
        });
      });
    });
  });
}

// Manejar cierre
process.on('SIGINT', () => {
  console.log('\n👋 ¡Hasta luego!');
  rl.close();
  process.exit(0);
});

