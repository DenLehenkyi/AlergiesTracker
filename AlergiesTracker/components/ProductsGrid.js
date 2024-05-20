import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import EggSvg from "../assets/svgs/egg";
import NutsSvg from "../assets/svgs/nuts";
import ZernoSvg from "../assets/svgs/zerno";
import FishSvg from "../assets/svgs/fish";
import ChocolateSvg from "../assets/svgs/chocolate";
import VegetablesSvg from "../assets/svgs/vegetables";
import FruitsSvg from "../assets/svgs/fruits";
import HoneySvg from "../assets/svgs/honey";
import PylokSvg from "../assets/svgs/pylok";
import AnimalsSvg from "../assets/svgs/animals";
import KlishchiSvg from "../assets/svgs/klishchi";
import PlisniavaSvg from "../assets/svgs/plisniava";
import InsectsSvg from "../assets/svgs/insects";
import DrugsSvgs from "../assets/svgs/drugs";

const ProductsArray = [
  { 
    name: "Яйця", 
    svg: EggSvg,
    subcategories: ["Білок", "Жовток"] 
  },
  { 
    name: "Горіхи", 
    svg: NutsSvg,
    subcategories: ["Мигдаль", "Фундук", "Грецький горіх", "Арахіс"] 
  },
  { 
    name: "Зернові", 
    svg: ZernoSvg,
    subcategories: ["Пшениця", "Жито", "Ячмінь"] 
  },
  { 
    name: "Море-продукти", 
    svg: FishSvg,
    subcategories: ["Риба", "Креветки", "Мідії"] 
  },
  { 
    name: "Шоколад", 
    svg: ChocolateSvg,
    subcategories: ["Темний шоколад", "Молочний шоколад"] 
  },
  { 
    name: "Овочі", 
    svg: VegetablesSvg,
    subcategories: ["Морква", "Картопля", "Буряк"] 
  },
  { 
    name: "Фрукти", 
    svg: FruitsSvg,
    subcategories: ["Яблука", "Банани", "Цитрусові"] 
  },
  { 
    name: "Мед", 
    svg: HoneySvg,
    subcategories: [] 
  },
  { 
    name: "Пилок", 
    svg: PylokSvg,
    subcategories: [] 
  },
  { 
    name: "Шерсть тварин", 
    svg: AnimalsSvg,
    subcategories: ["Коти", "Собаки"] 
  },
  { 
    name: "Кліщі", 
    svg: KlishchiSvg,
    subcategories: [] 
  },
  { 
    name: "Пліснява", 
    svg: PlisniavaSvg,
    subcategories: [] 
  },
  { 
    name: "Комахи", 
    svg: InsectsSvg,
    subcategories: ["Бджоли", "Оси"] 
  },
  { 
    name: "Пеніцилін", 
    svg: DrugsSvgs,
    subcategories: [] 
  }
];

const ProductsGrid = ({ oncklick }) => {
  return (
    <View style={styles.allProducts}>
      {ProductsArray.map((item, index) => (
              <TouchableOpacity
              style={styles.product}
              onPress={() => oncklick(item)}
              key={index}
            >
          <Text style={styles.name}>{item.name}</Text>
          <item.svg/>
        </TouchableOpacity>
      ))}

    </View>
  );
};

const styles = StyleSheet.create({
  allProducts: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
    marginBottom: 50,
    marginLeft: 20,
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
    // Elevation for Android
    elevation: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    marginTop: 8,
    fontSize: 16,
  },
});

export default ProductsGrid;
