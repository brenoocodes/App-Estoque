import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { estilos } from '../../entradas/detalhes/estilos';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import api from '../../../services';
import ModalDeProduto from '../../../components/modal/modal-lista/modaldeproduto';
import ModalSaidaFuncionario from '../../../components/modal/modal-lista/modaldefucionario';
import ModalMensagem from '../../../components/modal/modal-mensagens';

export default function DetalhesSaida({ route }) {
  const { id, quanti, itemData } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState();
  const [modalProduto, setModalProduto] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState();
  const [modalFuncionario, setModalFuncionario] = useState(false);
  const [quantidade, setQuantidade] = useState(itemData.quantidade.toString());
  const [editarQuantidade, setEditarQuantidade] = useState(false);
  const quantidadeInputRef = useRef(null);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [modalEditarOk, setModalEditarOk] = useState(false);
  const [modalExcluirOk, setModalExcluirOk] = useState(false);
  const [modalQuantidadeInvalida, setModalQuantidadeInvalida] = useState(false)

  useEffect(() => {
    setLoading(true);
    async function buscarProdutos() {
      try {
        const response = await api.get('/produtos');
        const produtosData = response.data.produtos.map(produto => ({
          id: produto.id,
          nome_estoque: produto.nome_estoque,
          nome: produto.nome,
        }));
        setProdutos(produtosData);
        if (itemData.produto) {
          const selectedProduto = produtosData.find(produto => produto.nome_estoque === itemData.produto.toString());
          if (selectedProduto) {
            setProdutoSelecionado(selectedProduto);
          }
        }
        const funcionariosResponse = await api.get('/funcionarios');
        setFuncionarios(funcionariosResponse.data);
        if (itemData.funcionário_solicitante) {
          const selectedFuncionario = funcionariosResponse.data.find(funcionario => funcionario.nome === itemData.funcionário_solicitante.toString());
          if (selectedFuncionario) {
            setFuncionarioSelecionado(selectedFuncionario);
          }
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    buscarProdutos();
  }, []);

  function mudarProduto(item) {
    setProdutoSelecionado(item);
  }

  function mudarFuncionario(item) {
    setFuncionarioSelecionado(item);
  }

  const editaQuantidade = () => {
    setEditarQuantidade(true);
    setTimeout(() => {
      quantidadeInputRef.current.focus();
    }, 100);
  };

  async function registrarAlteracao() {
    setLoading(true);
    try {
      const produto_id = Number(produtoSelecionado.id);
      const funcionario_solicitante_matricula = Number(funcionarioSelecionado.matricula);
      const response = await api.put(`/saida_ao_estoque/${id}`, {
        produto_id: produto_id,
        funcionario_solicitante_matricula: funcionario_solicitante_matricula,
        quantidade: quantidade
      });
      if (response.data.detail === "Quantidade insuficiente em estoque") {
        setModalQuantidadeInvalida(true);
        setLoading(false);
      } else {
        setModalEditarOk(true);
        setLoading(false);
      }

    } catch (err) {
      console.log("Erro ao cadastrar uma saida:", err);
      setLoading(false);
    }
  }

  async function excluirSaida() {
    setLoading(true);
    try {
      const response = await api.delete(`/saida_ao_estoque/${id}`);
      setModalExcluirOk(true);
      setLoading(false);
    } catch (err) {
      console.log("Erro ao excluir a saída:", err);
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
        ID da saída:  <Text style={{ fontWeight: '400' }}>{id}</Text>
      </Text>
      <Text style={estilos.titleInput}>
        Qual produto vai sair
      </Text>
      <View style={estilos.editinputview}>
        {produtos.length !== 0 && (
          <View style={estilos.input}>
            <Text>{produtoSelecionado && produtoSelecionado.nome_estoque}</Text>
            <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => setModalProduto(true)}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={estilos.titleInput}>
        Aqui vai escolher quem está pedindo o produto
      </Text>

      <View style={estilos.editinputview}>
        {produtos.length !== 0 && (
          <View style={estilos.input}>
            <Text>{funcionarioSelecionado && funcionarioSelecionado.nome}</Text>
            <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => setModalFuncionario(true)}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={estilos.titleInput}>
        Aqui você colocar a quantidade
      </Text>
      <View style={estilos.editinputview}>
        <TextInput
          keyboardType='numeric'
          ref={quantidadeInputRef}
          editable={editarQuantidade}
          style={estilos.input}
          value={quantidade}
          onChangeText={setQuantidade}
        />
        <TouchableOpacity onPress={editaQuantidade} style={{ position: 'absolute', right: 10 }}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {quantidade === '' ? (
        <View style={estilos.botoesView}>
          <View style={[estilos.botoes, { backgroundColor: '#0000aa10' }]}>
            <Text style={{ color: '#fff' }}>
              Editar
            </Text>
          </View>

          <View style={[estilos.botoes, { backgroundColor: '#dd000010' }]}>
            <Text style={{ color: '#fff' }}>
              Excluir pedido
            </Text>
          </View>
        </View>
      ) : (
        <View style={estilos.botoesView}>
          <TouchableOpacity onPress={() => setModalEditar(true)} style={[estilos.botoes, { backgroundColor: '#0000aa' }]}>
            <Text style={{ color: '#fff' }}>
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalExcluir(true)} style={[estilos.botoes, { backgroundColor: '#dd0000' }]}>
            <Text style={{ color: '#fff' }}>
              Excluir pedido
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal transparent={true} visible={modalProduto} animationType='none'>
        <ModalDeProduto fecharModal={() => setModalProduto(false)} options={produtos} itemSelecionado={mudarProduto} />
      </Modal>
      <Modal transparent={true} visible={modalFuncionario} animationType='none'>
        <ModalSaidaFuncionario fecharModal={() => setModalFuncionario(false)} options={funcionarios} itemSelecionado={mudarFuncionario} />
      </Modal>

      {/* Modal de Edição */}
      <Modal transparent={true} visible={modalEditar} animationType='none'>
        <View style={estilos.modal}>
          <View style={estilos.conteudomodal}>
            <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 7 }}>
              Deseja editar a saída?
            </Text>
            <Text>
              ID da saída: {id} || Produto: {produtoSelecionado && produtoSelecionado.nome_estoque} || Funcionário: {funcionarioSelecionado && funcionarioSelecionado.nome} || Quantidade: {quantidade}
            </Text>
            <View style={estilos.botaoviewmodal}>
              <TouchableOpacity style={[estilos.botaomodal, { backgroundColor: '#0000ff' }]} onPress={() => { registrarAlteracao(); setModalEditar(false) }}>
                <Text style={{ color: '#fff' }}>
                  Sim
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[estilos.botaomodal, { backgroundColor: '#dd0000' }]} onPress={() => setModalEditar(false)}>
                <Text style={{ color: '#fff' }}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal transparent={true} visible={modalExcluir} animationType='none'>
        <View style={estilos.modal}>
          <View style={estilos.conteudomodal}>
            <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 7 }}>
              Deseja excluir a saída?
            </Text>
            <Text>
              ID da saída: {id} || Produto: {produtoSelecionado && produtoSelecionado.nome_estoque} || Funcionário: {funcionarioSelecionado && funcionarioSelecionado.nome} || Quantidade: {quantidade}
            </Text>
            <View style={estilos.botaoviewmodal}>
              <TouchableOpacity style={[estilos.botaomodal, { backgroundColor: '#0000ff' }]} onPress={() => { excluirSaida(); setModalExcluir(false) }}>
                <Text style={{ color: '#fff' }}>
                  Sim
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[estilos.botaomodal, { backgroundColor: '#dd0000' }]} onPress={() => setModalExcluir(false)}>
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
        visible={modalEditarOk}
      >
        <ModalMensagem fecharModal={() => { setModalEditarOk(false); navigation.goBack() }} texto="Saida modificada com sucesso" textobotao="OK" />
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalExcluirOk}
      >
        <ModalMensagem fecharModal={() => { setModalExcluirOk(false); navigation.goBack() }} texto="Saida deletada com sucesso" textobotao="OK" />
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalQuantidadeInvalida}
      >
        <ModalMensagem fecharModal={() => setModalQuantidadeInvalida(false)} texto="A quantidade que você deseja cadastrar é maior do que a presente no estoque, segundo nossa base de dados. Favor se dirigir à direção caso os números estejam errados." textobotao="OK" />
      </Modal>

    </View>
  );
}
