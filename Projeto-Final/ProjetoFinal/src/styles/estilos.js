import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FFF9',
    paddingHorizontal: 16,
    paddingTop: 20
  },
  titulo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1B5E20',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 0.5
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#66BB6A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#2E7D32',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2
  },
  itemPlanta: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E8F5E9'
  },
  imagemPlanta: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#A5D6A7'
  },
  detalhesPlanta: {
    flex: 1,
    justifyContent: 'center'
  },
  nomePlanta: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 4,
    letterSpacing: 0.3
  },
  dataRega: {
    color: '#66BB6A',
    fontSize: 14,
    fontWeight: '500'
  },
  imagemSelecionada: {
    width: width - 32,
    height: 250,
    borderRadius: 16,
    marginVertical: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4
  },
  imagemDetalhes: {
    width: width - 32,
    height: 300,
    borderRadius: 16,
    marginBottom: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4
  },
  botao: {
    backgroundColor: '#43A047',
    borderRadius: 12,
    paddingVertical: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4
  },
  textoBotao: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  botaoRemover: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#FF4444',
    marginLeft: 8
  },
  textoRemover: {
    color: '#FF4444',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 20
  },
  labelInput: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 6,
    marginLeft: 4
  },
  cardInfo: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#A5D6A7'
  },
  textoInfo: {
    color: '#2E7D32',
    fontSize: 15,
    fontWeight: '500'
  }
});