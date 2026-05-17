import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FourtecColors } from '@/constants/Colors';
import { getBCVendor } from '@/services/vendorService';

type Vendor = {
  id: string;
  number: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  currencyCode: string;
  taxRegistrationNumber: string;
  blocked: string;
  balance: number;
};

function DetailRow({ icon, label, value, onPress }: {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
  value?: string;
  onPress?: () => void;
}) {
  if (!value) return null;
  return (
    <TouchableOpacity
      style={styles.detailRow}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.detailIcon}>
        <FontAwesome name={icon} size={14} color={FourtecColors.teal} />
      </View>
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={[styles.detailValue, onPress && styles.detailLink]}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function VendorDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getBCVendor(id)
      .then((data) => {
        setVendor(data);
        navigation.setOptions({ title: data.displayName || data.number });
      })
      .catch(() => setError('Could not load vendor.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={FourtecColors.teal} />
      </View>
    );
  }

  if (error || !vendor) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error ?? 'Vendor not found.'}</Text>
      </View>
    );
  }

  const address = [
    vendor.addressLine1,
    vendor.addressLine2,
    vendor.city,
    vendor.postalCode,
    vendor.country,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header card */}
      <View style={styles.heroCard}>
        <View style={styles.heroAvatar}>
          <Text style={styles.heroAvatarText}>
            {(vendor.displayName || vendor.number || '?')[0].toUpperCase()}
          </Text>
        </View>
        <Text style={styles.heroName}>{vendor.displayName || '—'}</Text>
        <Text style={styles.heroNumber}>#{vendor.number}</Text>
        {vendor.blocked && vendor.blocked !== ' ' && (
          <View style={styles.blockedBadge}>
            <Text style={styles.blockedText}>BLOCKED</Text>
          </View>
        )}
      </View>

      {/* Balance card */}
      {vendor.balance != null && (
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Balance (LCY)</Text>
          <Text style={styles.balanceValue}>
            {vendor.balance.toLocaleString('da-DK', { minimumFractionDigits: 2 })}
          </Text>
        </View>
      )}

      {/* Contact section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>CONTACT</Text>
        <DetailRow
          icon="envelope"
          label="Email"
          value={vendor.email}
          onPress={() => vendor.email && Linking.openURL(`mailto:${vendor.email}`)}
        />
        <DetailRow
          icon="phone"
          label="Phone"
          value={vendor.phoneNumber}
          onPress={() => vendor.phoneNumber && Linking.openURL(`tel:${vendor.phoneNumber}`)}
        />
        <DetailRow icon="map-marker" label="Address" value={address} />
      </View>

      {/* Finance section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>FINANCE</Text>
        <DetailRow icon="money" label="Currency" value={vendor.currencyCode} />
        <DetailRow icon="file-text" label="Tax Reg. No." value={vendor.taxRegistrationNumber} />
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
  heroAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(0,180,204,0.10)',
    borderWidth: 2,
    borderColor: FourtecColors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroAvatarText: {
    color: FourtecColors.teal,
    fontSize: 28,
    fontWeight: '800',
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
  },
  blockedBadge: {
    marginTop: 10,
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
  balanceCard: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: 'rgba(0,180,204,0.10)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,180,204,0.25)',
    padding: 20,
    alignItems: 'center',
  },
  balanceLabel: {
    color: FourtecColors.lightGray,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  balanceValue: {
    color: FourtecColors.teal,
    fontSize: 26,
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
  detailLink: {
    color: FourtecColors.teal,
  },
});
