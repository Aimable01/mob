import React, { useState, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { products } from "@/util/data";
import { Colors, Spacing, Typography } from "@/util/constants";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";

export default function Index() {
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

  const featuredProducts = products.filter(product => product.featured);

  const renderFeaturedItem = ({ item }: { item: any }) => (
    <ProductCard
      product={item}
      onAddToCart={() => addToCart(item)}
      variant="featured"
    />
  );

  const renderGridItem = ({ item }: { item: any }) => (
    <ProductCard
      product={item}
      onAddToCart={() => addToCart(item)}
      variant="default"
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning! 👋</Text>
            <Text style={styles.subtitle}>Find your perfect product</Text>
          </View>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Featured Products */}
        {!searchQuery && selectedCategory === "all" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <FlatList
              data={featuredProducts}
              renderItem={renderFeaturedItem}
              keyExtractor={(item) => `featured-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
            />
          </View>
        )}

        {/* Products Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchQuery
              ? `Search Results (${filteredProducts.length})`
              : selectedCategory === "all"
              ? "All Products"
              : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}
          </Text>
          
          <View style={styles.gridContainer}>
            <FlatList
              data={filteredProducts}
              renderItem={renderGridItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
              scrollEnabled={false}
              contentContainerStyle={styles.gridContent}
            />
          </View>
        </View>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No products found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or category filter
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  greeting: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  featuredList: {
    paddingHorizontal: Spacing.md,
  },
  gridContainer: {
    paddingHorizontal: Spacing.md,
  },
  gridContent: {
    paddingBottom: Spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
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
