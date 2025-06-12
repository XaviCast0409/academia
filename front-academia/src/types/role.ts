export interface RoleInput {
  name: string;
}

export interface Role extends RoleInput {
  id: string;
  createdAt: string;
}