export interface Service {
  id: number;
  name: string;
  image_url: string;
  end_date: string;
}

export interface ServiceDetail extends Service {
  email: string;
  password: string;
}

export interface UpdateServiceDto {
  email?: string;
  password?: string;
  endDate?: string;
  imageUrl?: string;
}
