export interface CrudInterface<T> {
  index: (id: number) => Promise<T | null>;
  create: (data: T) => Promise<T>;
  update: (currentUser: T, data: T) => Promise<T>;
  delete: (id: number) => Promise<void>;
}