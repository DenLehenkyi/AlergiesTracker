import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, Button } from "react-native";
import ZernoSvg from "../assets/svgs/zerno";

const symptomsArray = [
  { id: 1, name: "Нежить" },
  { id: 2, name: "Чхання" },
  { id: 3, name: "Свербіж очей" },
  { id: 4, name: "Сльозотеча" },
  { id: 5, name: "Закладеність носа" },
  { id: 6, name: "Кашель" },
  { id: 7, name: "Свербіж в горлі" },
  { id: 8, name: "Кропив'янка" },
  { id: 9, name: "Висип" },
  { id: 10, name: "Свербіж шкіри" },
  { id: 11, name: "Задишка" },
  { id: 12, name: "Хрипи" },
  { id: 13, name: "Набряк обличчя" },
  { id: 14, name: "Набряк губ" },
  { id: 15, name: "Набряк язика" },
  { id: 16, name: "Біль у животі" },
  { id: 17, name: "Нудота" },
  { id: 18, name: "Блювання" },
  { id: 19, name: "Діарея" },
  { id: 20, name: "Червоні плями на шкірі" },
];

const AddSymptomsScreen = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productDangerous, setProductDangerous] = useState(false);

  const handleSelectSymptom = (symptom) => {
    setSelectedSymptoms((prevSelectedSymptoms) => {
      if (prevSelectedSymptoms.some((s) => s.id === symptom.id)) {
        return prevSelectedSymptoms.filter((s) => s.id !== symptom.id);
      } else {
        return [...prevSelectedSymptoms, symptom];
      }
    });
  };

  const markAsDangerous = () => {
    setProductDangerous((prevState) => !prevState);
  };

  return (
    <View style={[styles.container, productDangerous && styles.dangerousContainer]}>
      <Text style={styles.title}>Оберіть симптом</Text>
      <ScrollView contentContainerStyle={styles.wrap}>
        <View style={styles.flex}>
          <View style={[styles.product, productDangerous && styles.dangerousProduct]}>
            <ZernoSvg />
          </View>
          <View style={styles.options}>
            <Button title="Вибрати симптоми" onPress={() => setModalVisible(true)} />
            <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: 10 }}>Вибрані симптоми:</Text>
            {selectedSymptoms.map((symptom) => (
              <Text
                style={[
                  styles.symp,
                  productDangerous && styles.dangerousSymptom,
                ]}
                key={symptom.id}
              >
                {symptom.name}
              </Text>
            ))}
          </View>
        </View>
        <Button title="Позначити як особливо небезпечний алерген" onPress={markAsDangerous} />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalText}>Оберіть симптоми</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Закрити</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalScroll}>
            {symptomsArray.map((symptom) => (
              <TouchableOpacity
                key={symptom.id}
                style={[
                  styles.symptomButton,
                  selectedSymptoms.some((s) => s.id === symptom.id)
                    ? styles.selectedSymptom
                    : null,
                ]}
                onPress={() => handleSelectSymptom(symptom)}
              >
                <Text style={styles.symptomText}>{symptom.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FFF5",
  },
  dangerousContainer: {
    backgroundColor: "#FFCCCC",
  },
  symp: {
    backgroundColor: "#E2FFE6",
    marginRight: 5,
    padding: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  dangerousSymptom: {
    backgroundColor: "red",
    color: "white",
  },
  title: {
    fontSize: 24,
    alignSelf: "center",
    marginTop: 30,
  },
  product: {
    width: 88,
    height: 110,
    borderRadius: 15,
    backgroundColor: "#E2FFE6",
    shadowColor: "rgba(0, 0, 0, 0.35)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dangerousProduct: {
    backgroundColor: "red",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  symptomButton: {
    width: "auto",
    height: "auto",
    borderRadius: 15,
    backgroundColor: "#E2FFE6",
    shadowColor: "rgba(0, 0, 0, 0.35)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
  },
  selectedSymptom: {
    backgroundColor: "#538A6B",
  },
  symptomText: {
    color: "#333",
  },
  options: {
    flexDirection: "row",
    marginLeft: 20,
    flexWrap: "wrap",
    width: 240,
  },
  wrap: {
    padding: 10,
    borderColor: "green",
    borderWidth: 2,
    margin: 20,
    borderRadius: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalText: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: "center",
  },
  modalScroll: {
    width: "100%",
  },
  closeButtonText: {
    fontSize: 24,
  },
});

export default AddSymptomsScreen;
