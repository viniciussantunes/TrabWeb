import { Injectable } from '@angular/core';
import { Produto } from 'src/app/shared/models/produto.model';
import { Pedido, ItemPedido } from 'src/app/shared/models/pedido';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  BASE_URL="http://localhost:8080/pedidos";
  URL_PRODUTOS= "http://localhost:8080/produtos"

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  listarProdutos(){
    return this.httpClient.get<Produto[]>(this.URL_PRODUTOS, this.httpOptions);
  }

  inserirNovoProduto(produto :Produto){
    return this.httpClient.post<Produto>(this.URL_PRODUTOS, produto, this.httpOptions);
  }

  editarProduto(produto: Produto){
    return this.httpClient.put(this.URL_PRODUTOS + `/${produto.id}`, produto , this.httpOptions);
  }

  removerProduto(produto: Produto){
    console.log(this.URL_PRODUTOS + `/${produto.id}`)
    return this.httpClient.delete(this.URL_PRODUTOS + `/${produto.id}`, this.httpOptions);
  }


  listarPedidos(tipo_data: string | null = null, status?:string |null , data_inicio?: string | null, data_fim?: string | null){
    let params = new HttpParams();
    console.log(tipo_data)
    console.log(status)
    console.log(data_inicio)
    console.log(data_fim)
    if (tipo_data) {
      params = params.set('type', tipo_data);
    }

    if(status)
      params = params.set("status", status);
    
    if (data_inicio && data_fim) {
      params = params.set('inicio', data_inicio);
      params = params.set('fim', data_fim);
    }
    console.log()
    return this.httpClient.get<Pedido[]>(this.BASE_URL, { params });
  }

}
