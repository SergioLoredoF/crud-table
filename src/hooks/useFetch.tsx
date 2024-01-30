import axios from "axios";

//Declaración de interface
export interface IkrnReportes {
  reporteKey:       number | null,
  nombre:           string | null,
  asunto:           string | null,
  destinatarios:    string | null,
  query:            string | null,
  plantillaCorreo:  string | null,
  tipo:             string | null,
  estatus:          string | null,
  userKey:          number | null,
  dtime:            Date | null,
  lastModified:     Date | null,
}

export const InitKrnReportes = {
  reporteKey:       -1,
  nombre:           null,
  asunto:           null,
  destinatarios:    null,
  query:            null,
  plantillaCorreo:  null,
  tipo:             'EXCEL',
  estatus:          'ACTIVO',
  userKey:          1,
  dtime:            null,
  lastModified:     null,
}

const useFetch = (url: string) => {

  const HEADERS = {
    'x': 'x',
    'xx': 'x',
    'xxx': 'Bearer xxxx'
  }

  const getData = (): Promise<IkrnReportes[]>  => {

    return new Promise((resolve, reject) => {

    axios({
      method: 'get',
      url: url + '?fetchSize=9999&fetchOffset=0&totalResults=true',
      responseType: 'json',
      headers: HEADERS
    })
      .then(res => {
        resolve(res.data.items)
      })
      .catch(error => reject(error) ) 

    })// fin de la promesa
  }


  const postData = ( body: IkrnReportes ): Promise<IkrnReportes>  => {

    return new Promise((resolve, reject) => {

    axios({
      method: 'post',
      url: url,
      responseType: 'json',
      headers: HEADERS,
      data: body
    })
      .then(res => {
        resolve(res.data.items)
      })
      .catch(error => reject(error) ) 

    })// fin de la promesa
  }

  const putData = ( body: IkrnReportes ): Promise<IkrnReportes>  => {

    return new Promise((resolve, reject) => {

    axios({
      method: 'put',
      url: url + body.reporteKey,
      responseType: 'json',
      headers: HEADERS,
      data: body
    })
      .then(res => {
        resolve(res.data.items)
      })
      .catch(error => reject(error) ) 

    })// fin de la promesa
  }

  const deleteData = ( body: IkrnReportes ): Promise<string>  => {

    return new Promise((resolve, reject) => {

    axios({
      method: 'delete',
      url: url + body.reporteKey,
      responseType: 'json',
      headers: HEADERS,
    })
      .then(res => {
        resolve('Registro eliminado')
      })
      .catch(error => reject(error) ) 

    })// fin de la promesa
  }

  return [ getData, postData, putData, deleteData ];
};

export default useFetch 