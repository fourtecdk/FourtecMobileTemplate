import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { FourtecColors } from '@/constants/Colors';

function Badge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <View style={styles.badgeDot} />
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://fourtec.dk/assets/images/Logo_1_finaal.JPG' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Badge label="Betroet teknologipartner" />
        <Text style={styles.heroHeading}>
          Næste generation{'\n'}
          <Text style={styles.heroHeadingAccent}>Teknologiløsninger</Text>
        </Text>
        <Text style={styles.heroSubtext}>
          Styrker virksomheder med banebrydende værktøjer, problemfri
          integrationer og ekspertsupport — så du kan fokusere på det, der
          betyder mest.
        </Text>
        <View style={styles.ctaRow}>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => Linking.openURL('https://fourtec.dk/support.php')}
          >
            <Text style={styles.btnPrimaryText}>Få support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => Linking.openURL('https://fourtec.dk')}
          >
            <Text style={styles.btnSecondaryText}>Udforsk funktioner</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>HVORFOR VÆLGE FOURTEC</Text>
        <Text style={styles.sectionHeading}>Alt hvad du behøver for at lykkes</Text>
        <Text style={styles.sectionSubtext}>
          Vi kombinerer kraftfuld teknologi med en menneskelig tilgang for at
          levere resultater, der virkelig gør en forskel.
        </Text>
        <FeatureCard
          title="Virksomhedssikkerhed"
          description="Dine data fortjener den højeste grad af beskyttelse. Vi implementerer brancheledende sikkerhedsprotokoller og overholdelsestandarder, så din virksomhed forbliver sikker."
        />
        <FeatureCard
          title="Dedikeret support"
          description="Vores ekspertteam er altid klar til at hjælpe. Få personlig vejledning, hurtige svartider og tryghed ved, at nogen altid er på din side."
        />
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaHeading}>Klar til at komme i gang?</Text>
        <Text style={styles.ctaSubtext}>
          Har du spørgsmål eller brug for hjælp? Vores team er klar og vil hjælpe
          dig med næste skridt.
        </Text>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => Linking.openURL('https://fourtec.dk/support.php')}
        >
          <Text style={styles.btnPrimaryText}>Kontakt support</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerBrand}>Fourtec</Text>
        <Text style={styles.footerTagline}>
          Professionelle teknologiløsninger designet til at hjælpe din virksomhed
          med at trives i den digitale tidsalder.
        </Text>
        <View style={styles.footerContacts}>
          <Text style={styles.footerContact}>Rugaardsvej 5, 8680 Ry</Text>
          <Text
            style={[styles.footerContact, styles.footerLink]}
            onPress={() => Linking.openURL('tel:+4570359160')}
          >
            +45 7035 9160
          </Text>
          <Text
            style={[styles.footerContact, styles.footerLink]}
            onPress={() => Linking.openURL('mailto:info@fourtec.dk')}
          >
            info@fourtec.dk
          </Text>
        </View>
        <Text style={styles.footerCopy}>© 2026 Fourtec. Alle rettigheder forbeholdes.</Text>
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

  // Hero
  hero: {
    backgroundColor: FourtecColors.navyDark,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 48,
  },
  logo: {
    width: 140,
    height: 100,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: FourtecColors.white,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,180,204,0.5)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 24,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: FourtecColors.teal,
    marginRight: 8,
  },
  badgeText: {
    color: FourtecColors.teal,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  heroHeading: {
    fontSize: 32,
    fontWeight: '800',
    color: FourtecColors.white,
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 16,
  },
  heroHeadingAccent: {
    color: FourtecColors.teal,
  },
  heroSubtext: {
    fontSize: 15,
    color: FourtecColors.lightGray,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 320,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btnPrimary: {
    backgroundColor: FourtecColors.teal,
    borderRadius: 8,
    paddingHorizontal: 22,
    paddingVertical: 13,
  },
  btnPrimaryText: {
    color: FourtecColors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  btnSecondary: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 22,
    paddingVertical: 13,
  },
  btnSecondaryText: {
    color: FourtecColors.white,
    fontWeight: '700',
    fontSize: 14,
  },

  // Features Section
  section: {
    backgroundColor: FourtecColors.navyMid,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  sectionLabel: {
    color: FourtecColors.teal,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  sectionHeading: {
    color: FourtecColors.white,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  sectionSubtext: {
    color: FourtecColors.lightGray,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 28,
  },
  featureCard: {
    backgroundColor: 'rgba(0,180,204,0.07)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,180,204,0.15)',
    padding: 20,
    marginBottom: 16,
  },
  featureTitle: {
    color: FourtecColors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  featureDescription: {
    color: FourtecColors.lightGray,
    fontSize: 13,
    lineHeight: 20,
  },

  // CTA Section
  ctaSection: {
    backgroundColor: FourtecColors.navyDark,
    paddingHorizontal: 24,
    paddingVertical: 48,
    alignItems: 'center',
  },
  ctaHeading: {
    color: FourtecColors.white,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaSubtext: {
    color: FourtecColors.lightGray,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    maxWidth: 300,
  },

  // Footer
  footer: {
    backgroundColor: '#080f1a',
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  footerBrand: {
    color: FourtecColors.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  footerTagline: {
    color: FourtecColors.lightGray,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },
  footerContacts: {
    gap: 6,
    marginBottom: 20,
  },
  footerContact: {
    color: FourtecColors.lightGray,
    fontSize: 13,
  },
  footerLink: {
    color: FourtecColors.teal,
  },
  footerCopy: {
    color: '#4a6080',
    fontSize: 12,
  },
});

