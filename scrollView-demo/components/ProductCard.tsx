import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Product } from '@/util/data';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '@/util/constants';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddToCart: () => void;
  variant?: 'default' | 'featured' | 'compact';
}

const { width } = Dimensions.get('window');
const cardWidth = (width - Spacing.md * 3) / 2;

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  variant = 'default',
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }

    return stars.join('');
  };

  if (variant === 'featured') {
    return (
      <TouchableOpacity style={styles.featuredCard} onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: product.image }} style={styles.featuredImage} />
        <View style={styles.featuredContent}>
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>Featured</Text>
          </View>
          <Text style={styles.featuredName} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.featuredDescription} numberOfLines={2}>
            {product.description}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.stars}>{renderStars(product.rating)}</Text>
            <Text style={styles.rating}>
              {product.rating} ({product.reviews})
            </Text>
          </View>
          <View style={styles.priceContainer}>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>{product.originalPrice}</Text>
            )}
            <Text style={styles.featuredPrice}>{product.price}</Text>
          </View>
          <Button
            title="Add to Cart"
            onPress={onAddToCart}
            size="sm"
            style={styles.addButton}
          />
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === 'compact') {
    return (
      <TouchableOpacity style={styles.compactCard} onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: product.image }} style={styles.compactImage} />
        <View style={styles.compactContent}>
          <Text style={styles.compactName} numberOfLines={2}>
            {product.name}
          </Text>
          <View style={styles.compactRating}>
            <Text style={styles.compactStars}>{renderStars(product.rating)}</Text>
            <Text style={styles.compactRatingText}>{product.rating}</Text>
          </View>
          <View style={styles.compactPriceRow}>
            <View>
              {product.originalPrice && (
                <Text style={styles.compactOriginalPrice}>{product.originalPrice}</Text>
              )}
              <Text style={styles.compactPrice}>{product.price}</Text>
            </View>
            <TouchableOpacity style={styles.compactAddButton} onPress={onAddToCart}>
              <Text style={styles.compactAddText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.defaultCard} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: product.image }} style={styles.defaultImage} />
      <View style={styles.defaultContent}>
        <Text style={styles.defaultName} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>{renderStars(product.rating)}</Text>
          <Text style={styles.rating}>
            {product.rating} ({product.reviews})
          </Text>
        </View>
        <View style={styles.priceContainer}>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>{product.originalPrice}</Text>
          )}
          <Text style={styles.defaultPrice}>{product.price}</Text>
        </View>
        <Button
          title="Add to Cart"
          onPress={onAddToCart}
          size="sm"
          style={styles.addButton}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Featured card styles
  featuredCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },
  featuredContent: {
    padding: Spacing.lg,
  },
  featuredBadge: {
    backgroundColor: Colors.neutral900,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  featuredBadgeText: {
    color: Colors.white,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
  },
  featuredName: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  featuredDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  featuredPrice: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },

  // Default card styles
  defaultCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    width: cardWidth,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  defaultImage: {
    width: '100%',
    height: cardWidth * 0.8,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },
  defaultContent: {
    padding: Spacing.md,
  },
  defaultName: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    minHeight: 40,
  },
  defaultPrice: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },

  // Compact card styles
  compactCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  compactImage: {
    width: 80,
    height: 80,
    borderTopLeftRadius: BorderRadius.md,
    borderBottomLeftRadius: BorderRadius.md,
  },
  compactContent: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  compactName: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  compactRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  compactStars: {
    color: '#fbbf24',
    fontSize: Typography.sizes.sm,
    marginRight: Spacing.xs,
  },
  compactRatingText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },
  compactPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactPrice: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  compactOriginalPrice: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  compactAddButton: {
    backgroundColor: Colors.neutral900,
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactAddText: {
    color: Colors.white,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },

  // Common styles
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  stars: {
    color: '#fbbf24',
    fontSize: Typography.sizes.sm,
    marginRight: Spacing.xs,
  },
  rating: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  originalPrice: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
    marginRight: Spacing.sm,
  },
  addButton: {
    marginTop: Spacing.sm,
  },
});
