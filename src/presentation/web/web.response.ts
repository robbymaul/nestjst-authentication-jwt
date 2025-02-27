
export class WebResponse<T> {
  code: number;
  message?: string;
  data: T;
  errors?: string;
}