import React, { useState, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { products, categories } from "@/util/data";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "@/util/constants";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";

export default function Categories() {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const renderCategoryItem = ({ item }: { item: any }) => {
    const isSelected = selectedCategory === item.id;
    const categoryProducts = products.filter(p => 
      item.id === "all" ? true : p.category === item.id
    );

    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          isSelected && styles.selectedCategoryCard,
        ]}
        onPress={() => setSelectedCategory(item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryIcon}>{item.icon}</Text>
          <View style={styles.categoryInfo}>
            <Text
              style={[
                styles.categoryName,
                isSelected && styles.selectedCategoryName,
              ]}
            >
              {item.name}
            </Text>
            <Text
              style={[
                styles.categoryCount,
                isSelected && styles.selectedCategoryCount,
              ]}
            >
              {categoryProducts.length} products
            </Text>
          </View>
        </View>
        {isSelected && (
          <View style={styles.selectedIndicator} />
        )}
      </TouchableOpacity>
    );
  };

  const renderProductItem = ({ item }: { item: any }) => (
    <ProductCard
      product={item}
      onAddToCart={() => addToCart(item)}
      variant="compact"
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Browse products by category</Text>
      </View>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery("")}
        placeholder="Search in categories..."
      />

      <View style={styles.content}>
        {/* Categories List */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Products List */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>
            {searchQuery
              ? `Search Results (${filteredProducts.length})`
              : selectedCategory === "all"
              ? "All Products"
              : `${categories.find(c => c.id === selectedCategory)?.name} (${filteredProducts.length})`}
          </Text>
          
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No products found</Text>
                <Text style={styles.emptyStateSubtext}>
                  Try selecting a different category or adjusting your search
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  title: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  categoriesSection: {
    marginBottom: Spacing.lg,
  },
  productsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  categoriesList: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  categoryCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginRight: Spacing.sm,
    minWidth: 140,
    borderWidth: 1,
    borderColor: Colors.neutral200,
    ...Shadows.sm,
  },
  selectedCategoryCard: {
    backgroundColor: Colors.neutral900,
    borderColor: Colors.neutral900,
  },
  categoryHeader: {
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: Typography.sizes['2xl'],
    marginBottom: Spacing.sm,
  },
  categoryInfo: {
    alignItems: 'center',
  },
  categoryName: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  selectedCategoryName: {
    color: Colors.white,
  },
  categoryCount: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  selectedCategoryCount: {
    color: Colors.neutral300,
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.neutral900,
    borderRadius: BorderRadius.sm,
  },
  productsList: {
    paddingBottom: Spacing.xxl,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.md,
  },
  emptyStateText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  emptyStateSubtext: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
