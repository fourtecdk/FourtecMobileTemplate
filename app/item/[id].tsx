import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FourtecColors } from '@/constants/Colors';
import { getBCItem } from '@/services/itemService';

type Item = {
  id: string;
  number: string;
  displayName: string;
  displayName2: string;
  type: string;
  itemCategoryCode: string;
  blocked: boolean;
  unitPrice: number;
  unitCost: number;
  inventory: number;
  baseUnitOfMeasureCode: string;
  description: string;
};

function DetailRow({ icon, label, value }: {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
  value?: string | number;
}) {
  if (value == null || value === '') return null;
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailIcon}>
        <FontAwesome name={icon} size={14} color={FourtecColors.teal} />
      </View>
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{String(value)}</Text>
      </View>
    </View>
  );
}

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getBCItem(id)
      .then((data) => {
        setItem(data);
        navigation.setOptions({ title: data.displayName || data.number });
      })
      .catch(() => setError('Could not load item.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={FourtecColors.teal} />
      </View>
    );
  }

  if (error || !item) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error ?? 'Item not found.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header card */}
      <View style={styles.heroCard}>
        <View style={styles.heroIcon}>
          <FontAwesome name="cube" size={32} color={FourtecColors.teal} />
        </View>
        <Text style={styles.heroName}>{item.displayName || '—'}</Text>
        <Text style={styles.heroNumber}>#{item.number}</Text>
        <View style={styles.badges}>
          {item.type ? (
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>{item.type}</Text>
            </View>
          ) : null}
          {item.blocked && (
            <View style={styles.blockedBadge}>
              <Text style={styles.blockedText}>BLOCKED</Text>
            </View>
          )}
        </View>
      </View>

      {/* Pricing section */}
      <View style={styles.pricingRow}>
        <View style={styles.pricingCard}>
          <Text style={styles.pricingLabel}>Unit Price</Text>
          <Text style={styles.pricingValue}>
            {item.unitPrice != null
              ? item.unitPrice.toLocaleString('da-DK', { minimumFractionDigits: 2 })
              : '—'}
          </Text>
        </View>
        <View style={styles.pricingCard}>
          <Text style={styles.pricingLabel}>Unit Cost</Text>
          <Text style={styles.pricingValue}>
            {item.unitCost != null
              ? item.unitCost.toLocaleString('da-DK', { minimumFractionDigits: 2 })
              : '—'}
          </Text>
        </View>
        <View style={styles.pricingCard}>
          <Text style={styles.pricingLabel}>Inventory</Text>
          <Text style={styles.pricingValue}>
            {item.inventory != null ? item.inventory : '—'}
          </Text>
        </View>
      </View>

      {/* Details section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>DETAILS</Text>
        <DetailRow icon="tag" label="Item No." value={item.number} />
        <DetailRow icon="folder" label="Category" value={item.itemCategoryCode} />
        <DetailRow icon="balance-scale" label="Unit of Measure" value={item.baseUnitOfMeasureCode} />
        <DetailRow icon="info-circle" label="Description" value={item.displayName2 || item.description} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: FourtecColors.navyDark,
  },
  content: {
    paddingBottom: 40,
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
  },
  heroCard: {
    backgroundColor: FourtecColors.navyMid,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,180,204,0.15)',
  },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: 'rgba(0,180,204,0.15)',
    borderWidth: 2,
    borderColor: FourtecColors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroName: {
    color: FourtecColors.white,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
    textAlign: 'center',
  },
  heroNumber: {
    color: FourtecColors.lightGray,
    fontSize: 14,
    marginBottom: 12,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  typeBadge: {
    backgroundColor: 'rgba(0,180,204,0.15)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,180,204,0.3)',
  },
  typeBadgeText: {
    color: FourtecColors.teal,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  blockedBadge: {
    backgroundColor: 'rgba(224,92,92,0.15)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(224,92,92,0.4)',
  },
  blockedText: {
    color: '#e05c5c',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  pricingRow: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 20,
  },
  pricingCard: {
    flex: 1,
    backgroundColor: FourtecColors.navyMid,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,180,204,0.15)',
    padding: 14,
    alignItems: 'center',
  },
  pricingLabel: {
    color: FourtecColors.lightGray,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  pricingValue: {
    color: FourtecColors.white,
    fontSize: 15,
    fontWeight: '800',
  },
  section: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: FourtecColors.navyMid,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,180,204,0.15)',
    overflow: 'hidden',
  },
  sectionLabel: {
    color: FourtecColors.teal,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  detailIcon: {
    width: 24,
    alignItems: 'center',
    marginTop: 2,
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    color: FourtecColors.lightGray,
    fontSize: 12,
    marginBottom: 2,
  },
  detailValue: {
    color: FourtecColors.white,
    fontSize: 15,
    fontWeight: '500',
  },
});
