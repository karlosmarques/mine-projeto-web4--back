export interface RegisterDto {
    username: string;
    email: string;
    password: string;
    imageUrl?: string;
}
export interface LoginDto {
    email: string;
    password: string;
}