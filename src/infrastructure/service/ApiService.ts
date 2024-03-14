// import { App } from 'vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import JwtService from '@/core/services/JwtService'
// import { AxiosResponse, AxiosRequestConfig } from 'axios'
// import jwt_decode from 'jwt-decode'
// const ID_TOKEN_KEY = 'id_token' as string
// /**
//  * @description service to call HTTP request via Axios
//  */
// class ApiService {
//   /**
//    * @description property to share vue instance
//    */
//   public static vueInstance: App

//   /**
//    * @description initialize vue axios
//    */
//   public static init(app: App<Element>) {
//     console.log('url', import.meta.env.VITE_APP_API_URL)
//     ApiService.vueInstance = app
//     ApiService.vueInstance.use(VueAxios, axios)
//     ApiService.vueInstance.axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL
//     ApiService.vueInstance.axios.interceptors.request.use((request: any) => {
//       const token = JwtService.getToken()
//       if (token) {
//         console.log('Token', token)
//         request.headers.common.Authorization = `Bearer ${token}`
//         request.headers.common['Accept'] = 'application/json'
//         // request timeout 3 seconds
//         // request.timeout = 5000;
//       } else {
//         console.log('No token')
//       }

//       return request
//     })
//     ApiService.vueInstance.axios.interceptors.response.use(
//       (response: any) => {
//         if (response.status === 401) {
//           // localStorage.clear()
//           JwtService.destroyToken()
//           window.location.href = '/#/sign-in'
//         }
//         return response.data
//       },
//       (err: any) => {
//         if (err.response.status === 401) {
//           // localStorage.clear()
//           JwtService.destroyToken()
//           window.location.href = '/#/sign-in'
//         }
//         return Promise.reject(err)
//       }
//     )
//   }

//   /**
//    * @description set the default HTTP request headers
//    */
//   public static setHeader(): void {
//     console.log('set header')
//     ApiService.vueInstance.axios.defaults.headers.common['Authorization'] =
//       `Bearer ${JwtService.getToken()}`
//     ApiService.vueInstance.axios.defaults.headers.common['Accept'] = 'application/json'
//   }

//   /**
//    * @description send the GET HTTP request
//    * @param resource: string
//    * @param params: AxiosRequestConfig
//    * @returns Promise<AxiosResponse>
//    */
//   public static get(resource: string, params: AxiosRequestConfig): any {
//     return new Promise((resolve, reject) => {
//       ApiService.vueInstance.axios
//         .get(resource, params)
//         .then((res) => {
//           resolve([null, res])
//         })
//         .catch((err) => {
//           resolve([err, null])
//         })
//     })
//   }

//   /**
//    * @description send the GET HTTP request
//    * @param resource: string
//    * @param slug: string
//    * @returns Promise<AxiosResponse>
//    */
//   public static query(resource: string, slug = '' as string): any {
//     return new Promise((resolve, reject) => {
//       ApiService.vueInstance.axios
//         .get(`${resource}/?${slug}`)
//         .then((res) => {
//           resolve([null, res])
//         })
//         .catch((err) => {
//           resolve([err, null])
//         })
//     })
//   }

//   /**
//    * @description set the POST HTTP request
//    * @param resource: string
//    * @param params: AxiosRequestConfig
//    * @returns Promise<AxiosResponse>
//    */
//   public static post(resource: string, params: AxiosRequestConfig, headers: Object = {}): any {
//     return new Promise((resolve, reject) => {
//       ApiService.vueInstance.axios
//         .post(`${resource}`, params, headers)
//         .then((response) => {
//           console.log('success when post')
//           resolve([null, response])
//         })
//         .catch(({ response }) => {
//           console.log('error when post')
//           resolve([response, null])
//         })
//     })
//   }

//   /**
//    * @description send the UPDATE HTTP request
//    * @param resource: string
//    * @param slug: string
//    * @param params: AxiosRequestConfig
//    * @returns Promise<AxiosResponse>
//    */
//   public static update(
//     resource: string,
//     slug: string,
//     params: AxiosRequestConfig
//   ): Promise<AxiosResponse> {
//     return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params)
//   }

//   /**
//    * @description Send the PUT HTTP request
//    * @param resource: string
//    * @param params: AxiosRequestConfig
//    * @returns Promise<AxiosResponse>
//    */
//   public static put(resource: string, params: AxiosRequestConfig): any {
//     return new Promise((resolve, reject) => {
//       ApiService.vueInstance.axios
//         .put(`${resource}`, params)
//         .then((response) => {
//           resolve([null, response])
//         })
//         .catch(({ response }) => {
//           resolve([response, null])
//         })
//     })
//   }

//   /**
//    * @description Send the DELETE HTTP request
//    * @param resource: string
//    * @returns Promise<AxiosResponse>
//    */
//   public static delete(resource: string): Promise<AxiosResponse> {
//     return ApiService.vueInstance.axios.delete(resource)
//   }
// }

// export default ApiService
