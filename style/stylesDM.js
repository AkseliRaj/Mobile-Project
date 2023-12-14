const { StyleSheet } = require('react-native')

const loadingDM = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: 230,
    resizeMode: 'contain'
  },

  text: {
    color: 'white'
  },

});

const errorDM = StyleSheet.create({
  Errorcontainer: {
    backgroundColor: "#282828",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  errorHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white"
  },
  errorMsg: {
    fontSize: 16,
    width: 230,
    textAlign: "center",
    color: "white"
  }
})

const dataDM = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828'
  },

  logo: {
    height: 120,
    width: 127,
    resizeMode: 'contain',
    alignSelf: 'flex-start'
  },

  article: {
    gap: 12,
    marginLeft: 14,
    marginRight: 30,
    marginBottom: 20,

  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },

  text: {
    fontSize: 13,
    color: "white"
  },

  bold: {
    fontWeight: "bold",
    color: "white"
  },

  subHeader: {
    fontSize: 16,
    marginLeft: 14,
    marginBottom: 10,
    color: "white"
  },

  tableTittleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  tableTittleSpace: {
    marginLeft: 5,
  },

  tableTittle: {
    color: "white",
    fontSize: 12
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center"
  },

  tableIcon: {
    width: 24,
    height: 24,
    marginRight: 8
  },

  tableText: {
    fontSize: 11,
    color: "white"
  },

  tableTextColor: {
    fontSize: 11,
    color: "#B3B3B3"
  },

  tableButtonCell: {
    justifyContent: "center"
  },

  tableButton: {
    backgroundColor: '#004CFF',
    padding: 3,
    borderRadius: 20
  },

  tableButtonText: {
    fontSize: 11,
    width: 40,
    height: 17,
    textAlign: "center",
    color: "white"
  },

  searchBar: {
    backgroundColor: '#E7E7E7',
    height: 40,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  searchInput: {
    fontSize: 15,
    color: '#000',
    width: '85%',
    height: '100%',
    marginLeft: 10,
    flex: 1
  },

  searchIcon: {
    marginLeft: 10
  },

  closeIcon: {
    marginRight: 14
  },


})

const specificDM = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#282828',
  },

  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  timePeriodContainer: {
    padding: 10,
    paddingTop: 0,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15
  },

  dataContainer: {
    marginBottom: 13,
  },

  coinNameHeadingContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    marginTop: 25,
  },

  chartContainer: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 16,
    overflow: 'hidden', // This is important to prevent overflow of border
    padding: 5,
  },

  dataWholeContainer: {
    width: 230,
  },

  coinNameHeading: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  },

  dataHeading: {
    fontWeight: "bold",
    fontSize: 13,
    color: "white"
  },

  dataText: {
    fontSize: 13,
    color: "white"
  },

  SpecificStockButton: {
    backgroundColor: '#004CFF',
    borderRadius: 14,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 30,
  },

  SpecificStockButtonText: {
    fontSize: 13,
    textAlign: "center",
    color: "white",
  },

  coinIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
})

const converterDM = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: "#282828",
  },

  header: {
    fontSize: 25,
    paddingTop: 20,
    fontWeight: "bold"
  },

  subHeader: {
    marginTop: 10,
    fontSize: 15
  },

  converterContainer: {
    marginTop: 20,
    width: "100%",
    height: 400,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20
  },

  cryptoInput: {
    borderColor: "black",
    borderColor: "#7393B3",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    height: 45,
    marginVertical: 30,
    paddingHorizontal: 20
  },

  list: {
    borderColor: "#7393B3",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    width: 300,
    marginBottom: 20
  },

  swapButton: {
    margin: 15
  },

  // Here's DropdownList.js

  listContainer: {
    width: "100%",
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#E7E7E7',
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  label: {
    marginBottom: 8,
    fontSize: 16,
  },

  textInput: {
    width: 100,
    height: 40
  },

  dropdownButton: {
    width: 90,
    backgroundColor: '#E7E7E7',
  },

  // Here's ConvertButton.js

  button: {
    marginTop: 20,
    backgroundColor: "#004CFF",
    padding: 10,
    width: 150,
    borderRadius: 15,
    alignItems: "center"
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15
  },

  // Here's ConversionResult.js

  resultContainer: {
    marginTop: 20,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 300
  },
  resultText: {
    color: "white",
    fontSize: 18
  }
})

export { loadingDM, errorDM, dataDM, specificDM, converterDM };