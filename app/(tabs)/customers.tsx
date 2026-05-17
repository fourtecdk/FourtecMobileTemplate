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
import { getBCCustomers } from '@/services/customerService';

type Customer = {
  id: string;
  number: string;
  displayName: string;
  email: string;
  phoneNumber: string;
};

export default function CustomersScreen() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBCCustomers()
      .then(setCustomers)
      .catch(() => setError('Could not load customers.'))
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
      data={customers}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <View style={styles.center}>
          <Text style={styles.emptyText}>No customers found.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push(`/customer/${item.id}`)}
          activeOpacity={0.7}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(item.displayName || item.number || '?')[0].toUpperCase()}
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowPrimary}>{item.displayName || '—'}</Text>
            <Text style={styles.rowSecondary}>
              {item.number}
              {item.email ? `  ·  ${item.email}` : ''}
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={14} color={FourtecColors.lightGray} />
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
    borderRadius: 20,
    backgroundColor: 'rgba(0,180,204,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0,180,204,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: FourtecColors.teal,
    fontSize: 16,
    fontWeight: '700',
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
});
