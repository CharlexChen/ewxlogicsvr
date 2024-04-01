/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { Observable, catchError, map, of } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  constructor(private readonly httpService: HttpService) {}

  getByHttp(url: string, config?: AxiosRequestConfig<any>) {
    const result = this.httpService.get(url, config).pipe(
      map((response: AxiosResponse<any>) => {
        return response.data;
      }),
      catchError((_error: AxiosError) => {
        // this.logger.error(error.response.data);
        return of(null);
      }),
    );
    return new Promise((resolve, reject) => {
      result.subscribe((value) => {
        resolve(value);
      });
    });
  }
  postByHttp(url: string, data: any, config?: AxiosRequestConfig<any>) {
    const result = this.httpService.post(url, data, config).pipe(
      map((response: AxiosResponse<any>) => {
        return response.data;
      }),
      catchError((_error: AxiosError) => {
        // this.logger.error(error.response.data);
        return of(null);
      }),
    );
    return new Promise((resolve, reject) => {
      result.subscribe((value) => {
        resolve(value);
      });
    });
  }
}
