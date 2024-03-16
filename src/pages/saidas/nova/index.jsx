import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Modal, Keyboard, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { estilos } from './estilos';
import ModalDeProduto from '../../../components/modal/modal-lista/modaldeproduto';
import ModalSaidaFuncionario from '../../../components/modal/modal-lista/modaldefucionario';
import api from '../../../services';

export default function NovaSaida() {
  const navigation = useNavigation();
  const [quantidade, setQuantidade] = useState("1");
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState();
  const [modalProduto, setModalProduto] = useState(false);

  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState();
  const [modalFuncionario, setModalFuncionario] = useState(false);

  const [modalConfirmacao, setModalConfirmacao] = useState(false);

  const [modalQuantidadeInvalida, setModalQuantidadeInvalida] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  useEffect(() => {
    setLoading(true)
    async function buscarProdutos() {
      try {
        const response = await api.get('/produtos');
        const produtosData = response.data.produtos.map(produto => ({
          id: produto.id,
          nome_estoque: produto.nome_estoque,
          nome: produto.nome,
        }));
        setProdutos(produtosData);
        setProdutoSelecionado(produtosData[0]);
        setLoading(false);
      }
      catch (err) {
        console.log("ERRO AO CADASTRAR", err);
        setLoading(false);
      }
    }
    buscarProdutos();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function buscarFuncionario() {   
      try {
        const response = await api.get('/funcionarios');
        const funcionariosData = response.data;
        setFuncionarios(funcionariosData);
        setFuncionarioSelecionado(funcionariosData[0]);
        setLoading(false);

      } catch (err) {
        console.log("ERRO AO CADASTRAR", err);
        setLoading(false);
      }
    }
    buscarFuncionario();
  }, []);

  async function cadastrarSaida() {
    try {
      const produto_id = Number(produtoSelecionado.id);
      const funcionario_solicitante_matricula = Number(funcionarioSelecionado.matricula);
  
      const response = await api.post('/saida_ao_estoque', {
        produto_id: produto_id,
        quantidade: quantidade,
        funcionario_solicitante_matricula: funcionario_solicitante_matricula
      });
  
      if (response.data.detail === "Quantidade insuficiente em estoque") {
        setMensagemErro("A quantidade que você deseja cadastrar é maior do que a presente no estoque, segundo nossa base de dados. Favor se dirigir à direção caso os números estejam errados.");
        setModalQuantidadeInvalida(true);
      } else {
        setMensagemErro("Nova saida ao estoque cadastrada com sucesso");
        setModalQuantidadeInvalida(true);
      }
    } catch (err) {
      console.log("ERRO AO CADASTRAR", err);
      setLoading(false);
    }
  }
  

  function mudarProduto(item) {
    setProdutoSelecionado(item);
  }
  function mudarFuncionario(item) {
    setFuncionarioSelecionado(item);
  }

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#131313" />
    );
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titleInput}>
        Aqui você vai escolher o produto que vai sair
      </Text>
      {produtos.length !== 0 && (
        <TouchableOpacity style={estilos.listagem} onPress={() => setModalProduto(true)}>
          <Text>{produtoSelecionado && produtoSelecionado.nome_estoque}</Text>
        </TouchableOpacity>
      )}

      <Text style={estilos.titleInput}>
        Aqui vai escolher quem está pedindo o produto
      </Text>

      {funcionarios.length !== 0 && (
        <TouchableOpacity style={estilos.listagem} onPress={() => setModalFuncionario(true)}>
          <Text>{funcionarioSelecionado && funcionarioSelecionado.nome}</Text>
        </TouchableOpacity>
      )}

      <Text style={estilos.titleInput}>
        Aqui você vai colocar a quantidade
      </Text>
      <TextInput
        style={estilos.input}
        keyboardType='numeric'
        placeholder='Digite a quantidade'
        value={quantidade}
        onChangeText={setQuantidade}
      />
      {quantidade === '' ? (
        <View style={estilos.meio}>
          <View style={estilos.viewbota}>
            <Text style={{ color: '#fff', fontSize: 15, textAlign: 'center' }}>
              Por favor, preencha todos os campos.
            </Text>
          </View>
        </View>
      ) : (
        <View style={estilos.meio}>
          <TouchableOpacity style={estilos.botao} onPress={() => setModalConfirmacao(true)}>
            <Text style={{ color: '#fff', fontSize: 15, textAlign: 'center' }}>
              Registrar nova saida
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal transparent={true} visible={modalProduto} animationType='none'>
        <ModalDeProduto
          fecharModal={() => setModalProduto(false)} options={produtos}
          itemSelecionado={mudarProduto}
        />
      </Modal>
      <Modal transparent={true} visible={modalFuncionario} animationType='none'>
        <ModalSaidaFuncionario fecharModal={() => setModalFuncionario(false)} options={funcionarios} itemSelecionado={(mudarFuncionario)} />
      </Modal>
      
      <Modal transparent={true} visible={modalConfirmacao} animationType='fade'>
        <View style={estilos.modal}>
          <View style={estilos.conteudomodal}>
            <Text style={{ fontWeight:'500', fontSize: 16, marginBottom: 7 }}>
              Deseja confirmar a saida?
            </Text>
            <Text>
              Produto: {produtoSelecionado && produtoSelecionado.nome_estoque} || Funcionário que pediu {funcionarioSelecionado && funcionarioSelecionado.nome} || Quantidade: {quantidade}
            </Text>
            <View style={estilos.botaoviewmodal}>
              <TouchableOpacity style={[estilos.botaomodal, { backgroundColor: '#0000ff' }]} onPress={() => 
                {cadastrarSaida() ;setModalConfirmacao(false)}}>
                <Text style={{color: '#fff'}}>
                  Sim
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[estilos.botaomodal, { backgroundColor: '#dd0000' }]} onPress={() => setModalConfirmacao(false)}>
              <Text style={{color: '#fff'}}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={modalQuantidadeInvalida} animationType='fade'>
        <View style={estilos.modal}>
          <View style={estilos.conteudomodal}>
            <Text style={{ fontWeight:'500', fontSize: 16, marginBottom: 7 }}>
              Status nova saida
            </Text>
            <Text>{mensagemErro}</Text>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <TouchableOpacity style={[estilos.botaomodal, { backgroundColor: '#0000ff', padding: 12, height: 50, width: '50%' }]} onPress={() => 
                {setModalQuantidadeInvalida(false); navigation.goBack()}}>
                <Text style={{color: '#fff'}}>
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}