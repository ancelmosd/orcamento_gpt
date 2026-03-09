
let clientes = JSON.parse(localStorage.getItem('clientes')||'[]')
let materiais = JSON.parse(localStorage.getItem('materiais')||'[]')
let servicos = JSON.parse(localStorage.getItem('servicos')||'[]')

function save(){
localStorage.setItem('clientes',JSON.stringify(clientes))
localStorage.setItem('materiais',JSON.stringify(materiais))
localStorage.setItem('servicos',JSON.stringify(servicos))
updateDashboard()
loadSelects()
}

function openTab(id){
document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'))
document.getElementById(id).classList.add('active')
loadSelects()
}

function addCliente(){
let nome=document.getElementById('clienteNome').value
let telefone=document.getElementById('clienteTelefone').value
clientes.push({nome,telefone})
save()
renderClientes()
}

function deleteCliente(i){
clientes.splice(i,1)
save()
renderClientes()
}

function renderClientes(){
let html=''
clientes.forEach((c,i)=>{
html+=`
<tr>
<td>${c.nome}</td>
<td>${c.telefone}</td>
<td><button onclick="deleteCliente(${i})">Apagar</button></td>
</tr>
`
})
document.getElementById('listaClientes').innerHTML=html
}

function addMaterial(){
let nome=document.getElementById('materialNome').value
let preco=parseFloat(document.getElementById('materialPreco').value)
materiais.push({nome,preco})
save()
renderMateriais()
}

function deleteMaterial(i){
materiais.splice(i,1)
save()
renderMateriais()
}

function renderMateriais(){
let html=''
materiais.forEach((m,i)=>{
html+=`
<tr>
<td>${m.nome}</td>
<td>R$ ${m.preco}</td>
<td><button onclick="deleteMaterial(${i})">Apagar</button></td>
</tr>
`
})
document.getElementById('listaMateriais').innerHTML=html
}

function addServico(){
let nome=document.getElementById('servicoNome').value
let valor=parseFloat(document.getElementById('servicoValor').value)
servicos.push({nome,valor})
save()
renderServicos()
}

function deleteServico(i){
servicos.splice(i,1)
save()
renderServicos()
}

function renderServicos(){
let html=''
servicos.forEach((s,i)=>{
html+=`
<tr>
<td>${s.nome}</td>
<td>R$ ${s.valor}</td>
<td><button onclick="deleteServico(${i})">Apagar</button></td>
</tr>
`
})
document.getElementById('listaServicos').innerHTML=html
}

function loadSelects(){

let c=document.getElementById('orcCliente')
let m=document.getElementById('orcMaterial')
let s=document.getElementById('orcServico')

if(!c) return

c.innerHTML=clientes.map(c=>`<option>${c.nome}</option>`)
m.innerHTML=materiais.map(m=>`<option value="${m.preco}">${m.nome}</option>`)
s.innerHTML=servicos.map(s=>`<option value="${s.valor}">${s.nome}</option>`)

}

function calcular(){

let largura=parseFloat(document.getElementById('largura').value)
let altura=parseFloat(document.getElementById('altura').value)

let precoMaterial=parseFloat(document.getElementById('orcMaterial').value)
let valorServico=parseFloat(document.getElementById('orcServico').value)

let area=largura*altura
let material=area*precoMaterial
let total=material+valorServico

document.getElementById('resultado').innerText=
`Área: ${area.toFixed(2)} m² | Total: R$ ${total.toFixed(2)}`

}

function updateDashboard(){
document.getElementById('totalClientes').innerText=clientes.length
document.getElementById('totalMateriais').innerText=materiais.length
document.getElementById('totalServicos').innerText=servicos.length
}

renderClientes()
renderMateriais()
renderServicos()
updateDashboard()
