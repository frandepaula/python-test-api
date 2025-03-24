# Teste para desenvolvedores Python

Instruções do teste
------

Desenvolva uma API REST utilizando a biblioteca Flask em linguagem Python que seja acessível localmente e verifique se um determinado número de CPF está em uma        *Blacklist*.

A aplicação deve:
 
1. Ser acessível como um serviço através de uma URL do tipo `http://IP:PORT/<cpf>`, por exemplo:
`http://127.0.0.1:5000/00000000000`


2. Retorne um JSON na consulta onde indique um retorno "FREE" caso o CPF não esteja na Blacklist, ou "BLOCK" caso o CPF pertença a Blacklist, por exemplo:
`{
"status": "FREE"
}
`
 

Para este teste você pode usar qualquer framework de sua escolha.

Os CPFs a serem testados estão no arquivo `blacklist.txt`.


Como entregar este teste
-----

Você deve forkar este projeto em sua própria conta do GitHub e fazer o commit em seu próprio repositório.

Execução
-----

1. Primeiro, crie um ambiente virtual para o projeto. No terminal, dentro da pasta do seu projeto, execute:

   ```bash
   python3 -m venv venv
2. Ative o ambiente virtual:

   ```bash
   source venv/bin/activate (no linux)
   .\venv\Scripts\activate (no windows)
3. Executar a API localmente:

   ```bash
   python3 app.py

4. Acessar via https://python-test-api-beta.vercel.app ou endereço http://127.0.0.1:5000/{cpf}:

