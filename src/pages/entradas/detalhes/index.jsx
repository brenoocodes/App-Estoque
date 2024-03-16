import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, Alert, Modal, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import api from '../../../services';
import ModalEntradaFornecedor from '../../../components/modal/modal-lista/modalfornecedor';
import ModalDeProduto from '../../../components/modal/modal-lista/modaldeproduto';
import ModalMensagem from '../../../components/modal/modal-mensagens';
import { estilos } from './estilos';

export default function DetalhesEntrada({ route, navigation }) {
    const { id, quanti, itemData } = route.params;

    const [loading, setLoading] = useState(false);
    const [nota, setNota] = useState(itemData.nota.toString());
    const [quantidade, setQuantidade] = useState(quanti.toString());
    const [fornecedores, setFornecedores] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null); // Inicialmente null
    const [produtoSelecionado, setProdutoSelecionado] = useState(null); // Inicialmente null
    const [editableNota, setEditableNota] = useState(false);
    const [editableQuantidade, setEditableQuantidade] = useState(false);
    const [produtoNaoAssociado, setProdutoNaoAssociado] = useState(false);
    const notaInputRef = useRef(null);
    const quantidadeInputRef = useRef(null);

    const [modalFornecedor, setModalFornecedor] = useState(false);
    const [modalProduto, setModalProduto] = useState(false);

    const [modalEditar, setModalEditar] = useState(false)
    const [modalExcluir, setModalExcluir] = useState(false)

    const [modalEditarOk, setModalEditarOk] = useState(false)
    const [modalExcluirOk, setModalExcluirOk] = useState(false)

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const fornecedoresResponse = await api.get('/fornecedores');
                const fornecedoresData = fornecedoresResponse.data.fornecedores;
                setFornecedores(fornecedoresData);

                // Verificar se há fornecedor selecionado
                if (itemData.fornecedor) {
                    const selectedFornecedor = fornecedoresData.find(fornecedor => fornecedor.nome_fantasia === itemData.fornecedor.toString());
                    if (selectedFornecedor) {
                        setFornecedorSelecionado(selectedFornecedor);
                    }
                }

                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar os dados:', error.message);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        setLoading(true)
        if (fornecedorSelecionado && itemData.produto) { // Verificar se itemData e itemData.nome_estoque estão definidos
            async function fetchProdutos() {
                try {
                    const produtosResponse = await api.get(`/fornecedores/${fornecedorSelecionado.id}`);

                    const produtosData = produtosResponse.data.produtos;

                    setProdutos(produtosData);

                    const produtoIndex = produtosData.findIndex(produto => produto.nome_estoque === itemData.produto);

                    if (produtoIndex === -1) {
                        setProdutoNaoAssociado(true)
                    }
                    if (produtoIndex !== -1) {
                        setProdutoSelecionado(produtosData[produtoIndex]);
                    }
                    setLoading(false);
                } catch (error) {
                    console.error('Erro ao carregar os produtos:', error.message);
                    setLoading(false);
                }
            }
            fetchProdutos();
        }
        setLoading(false)
    }, [fornecedorSelecionado, itemData]);

    function mudarFornecedor(item) {
        setFornecedorSelecionado(item);
    }

    function mudarProduto(item) {
        setProdutoSelecionado(item);
    }

    const editarNota = () => {
        setEditableNota(true);
        setTimeout(() => {
            notaInputRef.current.focus();
        }, 100);
    };

    const editarQuantidade = () => {
        setEditableQuantidade(true);
        setTimeout(() => {
            quantidadeInputRef.current.focus();
        }, 100);
    };

    const handleBlur = () => {
        setEditableNota(false);
        setEditableQuantidade(false);
    };

    async function registrarAlteracao() {
        setLoading(true);
        try {
            const produto_id = Number(produtoSelecionado.id);
            const fornecedor_id = Number(fornecedorSelecionado.id);
            const response = await api.put(`/entrada_ao_estoque/${id}`, {
                nota: nota,
                produto_id: produto_id,
                fornecedor_id: fornecedor_id,
                quantidade: quantidade
            });
            setModalEditarOk(true)
            setLoading(false)
        } catch (err) {
            console.log("Erro ao cadastrar uma entrada:", err);
        } finally {
            setLoading(false);
        }
    }

    async function excluirentrada() {
        setLoading(true)
        try {
            const response = await api.delete(`/entrada_ao_estoque/${id}`);
            setModalExcluirOk(true)
        } catch (err) {
            console.log("Erro ao cadastrar uma entrada:", err);
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
            <Text style={estilos.titleInput}>ID da entrada:<Text style={{ fontWeight: '300', marginLeft: 5 }}>  {id}</Text></Text>

            <Text style={estilos.titleInput}>
                Modificar informações da nota
            </Text>
            <View style={estilos.editinputview}>
                <TextInput
                    ref={notaInputRef}
                    editable={editableNota}
                    style={estilos.input}
                    value={nota}
                    onChangeText={setNota}
                    onBlur={handleBlur}
                />
                <TouchableOpacity onPress={editarNota} style={{ position: 'absolute', right: 10 }}>
                    <AntDesign name="edit" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Text style={estilos.titleInput}>
                Aqui você vai mudar o nome do fornecedor
            </Text>
            <View style={estilos.editinputview}>

                {fornecedores.length !== 0 && (
                    <View style={estilos.input}>
                        <Text>
                            {fornecedorSelecionado && fornecedorSelecionado.nome_fantasia}
                        </Text>
                    </View>
                )}

                <TouchableOpacity onPress={() => { Keyboard.dismiss(); setModalFornecedor(true) }} style={{ position: 'absolute', right: 10 }}>
                    <AntDesign name="edit" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Text style={estilos.titleInput}>
                Aqui você vai mudar o nome do produto
            </Text>


            <View style={estilos.editinputview}>
                {produtoNaoAssociado ? (
                    <View style={estilos.input}>
                        <Text style={{ color: 'red', textAlign: 'center', marginRight: 30 }}>
                            Este produto ({produtoSelecionado && produtoSelecionado.nome_estoque}) não está associado ao fornecedor selecionado.
                        </Text>
                        <TouchableOpacity onPress={() => { setModalProduto(true); setProdutoNaoAssociado(false) }} style={{ position: 'absolute', right: 10 }}>
                            <AntDesign name="edit" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                ) : (
                    produtos.length !== 0 && (
                        <View style={estilos.input}>
                            <Text>
                                {produtoSelecionado && produtoSelecionado.nome_estoque}
                            </Text>
                            <TouchableOpacity onPress={() => { setModalProduto(true); setProdutoNaoAssociado(false) }} style={{ position: 'absolute', right: 10 }}>
                                <AntDesign name="edit" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    )
                )}
            </View>

            <Text style={estilos.titleInput}>
                Aqui você colocar a quantidade
            </Text>
            <View style={estilos.editinputview}>
                <TextInput
                    keyboardType='numeric'
                    ref={quantidadeInputRef}
                    editable={editableQuantidade}
                    style={estilos.input}
                    value={quantidade}
                    onChangeText={setQuantidade}
                    onBlur={handleBlur}
                />
                <TouchableOpacity onPress={editarQuantidade} style={{ position: 'absolute', right: 10 }}>
                    <AntDesign name="edit" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {nota === '' || quantidade === '' || produtoNaoAssociado === true ? (
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

            <Modal transparent={true} visible={modalEditar} animationType='none'>
                <View style={estilos.modal}>
                    <View style={estilos.conteudomodal}>
                        <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 7 }}>
                            Deseja editar a entrada
                        </Text>
                        <Text>
                            Nota: {nota} || Fornecedor: {fornecedorSelecionado && fornecedorSelecionado.nome_fantasia} || Produto: {produtoSelecionado && produtoSelecionado.nome_estoque} || Quantidade: {quantidade}
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
            <Modal transparent={true} visible={modalExcluir} animationType='none'>
                <View style={estilos.modal}>
                    <View style={estilos.conteudomodal}>
                        <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 7 }}>
                            Deseja excluir a entrada?
                        </Text>
                        <Text>
                            Nota: {nota} || Fornecedor: {fornecedorSelecionado && fornecedorSelecionado.nome_fantasia} || Produto: {produtoSelecionado && produtoSelecionado.nome_estoque} || Quantidade: {quantidade}
                        </Text>
                        <View style={estilos.botaoviewmodal}>
                            <TouchableOpacity style={[estilos.botaomodal, { backgroundColor: '#0000ff' }]} onPress={() => { excluirentrada(); setModalExcluir(false) }}>
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

            <Modal transparent={true} visible={modalFornecedor} animationType='fade'>
                <ModalEntradaFornecedor fecharModal={() => setModalFornecedor(false)} options={fornecedores} itemSelecionado={mudarFornecedor} />
            </Modal>

            <Modal transparent={true} visible={modalProduto} animationType='fade'>
                <ModalDeProduto fecharModal={() => setModalProduto(false)} options={produtos} itemSelecionado={mudarProduto} />
            </Modal>

            <Modal
                animationType="none"
                transparent={true}
                visible={modalEditarOk}
            >
                <ModalMensagem fecharModal={() => { setModalEditar(false); navigation.goBack() }} texto="Nova alteração cadastrada com sucesso" textobotao="OK" />
            </Modal>

            <Modal
                animationType="none"
                transparent={true}
                visible={modalExcluirOk}
            >
                <ModalMensagem fecharModal={() => { setModalExcluirOk(false); navigation.goBack() }} texto="Nova exclusão cadastrada com sucesso" textobotao="OK" />
            </Modal>

        </View>
    );
}