import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Categories = ({ products }) => {
  return (
    <View style={styles.div}>
      <View style={styles.container}>
        {products && products.map((item, index) => (
          <View key={index} style={styles.pr}>
            <View style={styles.product}>
              <item.svg />
              <Text style={styles.name}>{item.name}</Text>
            </View>
            {item.subcategories && (
              <View style={styles.categoriesContainer}>
                {item.subcategories.map((category, categoryIndex) => (
                  <Text style={styles.category} key={categoryIndex}>{category}</Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#538A6B",
    height: 'auto',
    marginBottom: 10,
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
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
  name: {
    marginTop: 8,
    fontSize: 16,
  },
  categoriesContainer: {
    marginTop: 5,
    backgroundColor: "white"
  },
  category: {
    fontSize: 14,
    color: '#333',
  },
  div: {
    backgroundColor: "#F4FFF5"
  },
  pr:{
    flexDirection: "row"
  }
});

export default Categories;
