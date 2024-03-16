import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Modal, Keyboard, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import api from '../../../services/index'
import { estilos } from './estilos'
import { Input } from '../../../components/input';
import ModalEntradaFornecedor from '../../../components/modal/modal-lista/modalfornecedor';
import ModalDeProduto from '../../../components/modal/modal-lista/modaldeproduto';
import ModalMensagem from '../../../components/modal/modal-mensagens';

export default function NovaEntrada() {
  const navigation = useNavigation();
  const [nota, setNota] = useState('')
  const [loading, setLoading] = useState(false)
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState()
  const [modalEntradaFornecedor, setModalEntradaFornecedor] = useState(false)

  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState();
  const [modalEntradaProduto, setModalEntradaProduto] = useState(false);

  const [modalCofirmacao, setModalConfirmacao] = useState(false)

  const [quantidade, setQuantidade] = useState('1')
  const [modalConfirmado, setModalConfirmado] = useState(false)

  useEffect(() => {
    async function buscarFornecedores() {
      setLoading(true);
      try {
        const response = await api.get('/fornecedores');
        const fornecedoresData = response.data.fornecedores;
        setFornecedores(fornecedoresData);
        setFornecedorSelecionado(fornecedoresData[0]);
        setLoading(false);
      } catch (err) {
        console.log("ERRO AO CADASTRAR", err);
        setLoading(false);
      }
    }

    buscarFornecedores();
  }, []);

  useEffect(() => {
    if (fornecedorSelecionado) {
      setProdutos(fornecedorSelecionado.produtos);
      setProdutoSelecionado(fornecedorSelecionado.produtos[0]);
    }
  }, [fornecedorSelecionado]);

  function mudarFonecedor(item) {
    setFornecedorSelecionado(item);
  }

  function mudarProduto(item) {
    setProdutoSelecionado(item);
  }

  async function registrarEntrada() {
    setLoading(true);
    try {
      const produto_id = Number(produtoSelecionado.id);
      const fornecedor_id = Number(fornecedorSelecionado.id);
      const response = await api.post('/entrada_ao_estoque', {
        nota: nota,
        produto_id: produto_id,
        fornecedor_id: fornecedor_id,
        quantidade: quantidade
      });
      setModalConfirmado(true)

    } catch (err) {
      console.log("Erro ao cadastrar uma entrada:", err);
      alert('Erro ao cadastrar')
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#131313" />
    );
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titleInput}>
        Aqui você vai digitar o número da nota
      </Text>
      <View style={estilos.centerInput}>
        <Input autoCapitalize='characters'
          keyboardType='numbers-and-punctuation'
          placeholder='Digite as informações da nota'
          value={nota}
          onChangeText={setNota} />
      </View>

      <Text style={estilos.titleInput}>
        Aqui você vai escolher o nome do fornecedor
      </Text>
      {fornecedores.length !== 0 && (
        <TouchableOpacity style={estilos.listagem} onPress={() => { Keyboard.dismiss(); setModalEntradaFornecedor(true) }}>
          <Text>{fornecedorSelecionado && fornecedorSelecionado.nome_fantasia}</Text>
        </TouchableOpacity>
      )}

      <Text style={estilos.titleInput}>
        Aqui você vai escolher o nome do produto
      </Text>
      {produtos.length !== 0 && (
        <TouchableOpacity style={estilos.listagem} onPress={() => setModalEntradaProduto(true)}>
          <Text>{produtoSelecionado && produtoSelecionado.nome_estoque}</Text>
        </TouchableOpacity>
      )}

      <Text style={estilos.titleInput}>
        Aqui você colocar a quantidade
      </Text>
      <TextInput
        style={estilos.input}
        keyboardType='numeric'
        placeholder='Quantidade'
        value={quantidade}
        onChangeText={setQuantidade}
      />

      {nota === '' || quantidade === '' ? (
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
              Registrar nova entrada
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal transparent={true} visible={modalEntradaFornecedor} animationType='slide'>
        <ModalEntradaFornecedor fecharModal={() => setModalEntradaFornecedor(false)} options={fornecedores} itemSelecionado={mudarFonecedor} />
      </Modal>

      <Modal transparent={true} visible={modalEntradaProduto} animationType='slide'>
        <ModalDeProduto fecharModal={() => setModalEntradaProduto(false)} options={produtos} itemSelecionado={mudarProduto} />
      </Modal>

      <Modal transparent={true} visible={modalCofirmacao} animationType='none'>
        <View style={estilos.modal}>
          <View style={estilos.conteudomodal}>
            <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 7 }}>
              Deseja confirmar a entrada?
            </Text>
            <Text>
              Nota: {nota} || Fornecedor: {fornecedorSelecionado && fornecedorSelecionado.nome_fantasia} || Produto: {produtoSelecionado && produtoSelecionado.nome_estoque} || Quantidade: {quantidade}
            </Text>
            <View style={estilos.botaoviewmodal}>
              <TouchableOpacity style={[estilos.botaomodal, { backgroundColor: '#0000ff' }]} onPress={() => { registrarEntrada(); setModalConfirmacao(false) }}>
                <Text style={{ color: '#fff' }}>
                  Sim
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[estilos.botaomodal, { backgroundColor: '#dd0000' }]} onPress={() => setModalConfirmacao(false)}>
                <Text style={{ color: '#fff' }}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalConfirmado}
      >
        <ModalMensagem fecharModal={() => { setModalConfirmado(false); navigation.goBack() }} texto="Nova entrada cadastrada com sucesso" textobotao="OK" />
      </Modal>
    </View>
  );
}