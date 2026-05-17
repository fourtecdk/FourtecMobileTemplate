import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FourtecColors } from '@/constants/Colors';
import { getBCItems } from '@/services/itemService';

type Item = {
  id: string;
  number: string;
  displayName: string;
  type: string;
  unitPrice: number;
};

export default function ItemsScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBCItems()
      .then(setItems)
      .catch(() => setError('Could not load items.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={FourtecColors.teal} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={items}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <View style={styles.center}>
          <Text style={styles.emptyText}>No items found.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push(`/item/${item.id}`)}
          activeOpacity={0.7}
        >
          <View style={styles.avatar}>
            <FontAwesome name="cube" size={16} color={FourtecColors.teal} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowPrimary}>{item.displayName || item.number || '—'}</Text>
            <Text style={styles.rowSecondary}>
              {item.number}
              {item.type ? `  ·  ${item.type}` : ''}
            </Text>
          </View>
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>
              {item.unitPrice != null
                ? item.unitPrice.toLocaleString('da-DK', { minimumFractionDigits: 2 })
                : '—'}
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={14} color={FourtecColors.lightGray} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: FourtecColors.navyDark,
  },
  center: {
    flex: 1,
    backgroundColor: FourtecColors.navyDark,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  errorText: {
    color: '#e05c5c',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyText: {
    color: FourtecColors.lightGray,
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginLeft: 72,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: FourtecColors.navyDark,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(0,180,204,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0,180,204,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rowContent: {
    flex: 1,
  },
  rowPrimary: {
    color: FourtecColors.white,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  rowSecondary: {
    color: FourtecColors.lightGray,
    fontSize: 13,
  },
  priceTag: {
    backgroundColor: 'rgba(0,180,204,0.12)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  priceText: {
    color: FourtecColors.teal,
    fontSize: 12,
    fontWeight: '700',
  },
});
