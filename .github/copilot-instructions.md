# Fourtec Mobile Template — Copilot Instructions

## Project Overview
Expo SDK 54 / React Native 0.81 mobile app built with **Expo Router** (file-based routing) that integrates with **Microsoft Business Central** (BC) via OData v4.

## Tech Stack
- **Framework:** Expo SDK 54, React Native 0.81, React 19
- **Routing:** expo-router (file-based, `app/` directory)
- **HTTP client:** axios (via `services/bc_api.ts`)
- **Auth:** OAuth 2.0 client-credentials against Microsoft Entra (see `services/bc_api.ts`)
- **Language:** TypeScript (strict)

## Brand & Design
Match the **Fourtec** brand from [fourtec.dk](https://fourtec.dk):
- **Navy dark background:** `#0d1b2e`
- **Navy mid (cards/sections):** `#112240`
- **Teal accent (buttons, icons, highlights):** `#00b4cc`
- **White text:** `#ffffff`
- **Light gray subtext:** `#a8b2c1`
- Logo: `https://fourtec.dk/assets/images/Logo_1_finaal.JPG`
- All brand constants live in `constants/Colors.ts` as `FourtecColors`.

## Service Layer Pattern (`services/`)
Each BC entity gets its own service file. Follow this template:

```ts
import BC_API from './bc_api';

// List
export const getBCXxxs = async () => {
  const response = await BC_API.get('xxxs');
  return response.data.value;
};

// Single
export const getBCXxx = async (id: string) => {
  const response = await BC_API.get(`xxxs(${id})`);
  return response.data;
};

// Create
export const createBCXxx = async (body: Record<string, unknown>) => {
  const response = await BC_API.post('xxxs', body);
  return response.data;
};

// Update (requires If-Match / ETag)
export const updateBCXxx = async (id: string, body: Record<string, unknown>, etag: string) => {
  const response = await BC_API.patch(`xxxs(${id})`, body, {
    headers: { 'If-Match': etag },
  });
  return response.data;
};

// Delete (requires If-Match / ETag)
export const deleteBCXxx = async (id: string, etag: string) => {
  await BC_API.delete(`xxxs(${id})`, { headers: { 'If-Match': etag } });
};
```

Existing services: `itemService.ts`, `customerService.ts`, `vendorService.ts`.

## Routing Conventions
- `app/(tabs)/` — bottom-tab screens
- `app/modal.tsx` — modal overlay
- Add new tabs by creating a file in `app/(tabs)/` and registering a `<Tabs.Screen>` in `app/(tabs)/_layout.tsx`

## Environment Variables
All BC credentials come from `.env` (Expo public prefix):
```
EXPO_PUBLIC_BC_TENANT_ID
EXPO_PUBLIC_BC_CLIENT_ID
EXPO_PUBLIC_BC_CLIENT_SECRET
EXPO_PUBLIC_BC_ENVIRONMENT
EXPO_PUBLIC_BC_COMPANY_ID
EXPO_PUBLIC_BC_BASE_URL
```

## Coding Conventions
- Use functional components with React hooks.
- Use `StyleSheet.create` for styles — no inline style objects.
- Import `FourtecColors` from `@/constants/Colors` for all colour values.
- Keep service functions thin — no business logic, just HTTP calls + `console.error` on failure.
- Wrap BC PATCH/DELETE calls with the `If-Match` ETag header.

## UI Style Guide — Always Apply Fourtec Branding

Every screen and component **must** follow the Fourtec visual style. Never use plain white backgrounds, default React Native styles, or generic colours.

### Colours (always from `FourtecColors`)
| Token | Value | Usage |
|---|---|---|
| `navyDark` | `#0d1b2e` | Screen / page background |
| `navyMid` | `#112240` | Section backgrounds, card backgrounds |
| `teal` | `#00b4cc` | Primary buttons, active icons, accent text, badges |
| `tealDark` | `#0097aa` | Pressed/hover state on teal buttons |
| `white` | `#ffffff` | Primary headings, logo containers |
| `lightGray` | `#a8b2c1` | Body text, descriptions, subtext |

```ts
import { FourtecColors } from '@/constants/Colors';
```

### Screens
```ts
// Every screen root view
<ScrollView style={{ flex: 1, backgroundColor: FourtecColors.navyDark }}>
```

### Cards / Sections
```ts
{
  backgroundColor: FourtecColors.navyMid,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: 'rgba(0,180,204,0.15)',
  padding: 20,
}
```

### Primary Button
```ts
{
  backgroundColor: FourtecColors.teal,
  borderRadius: 8,
  paddingHorizontal: 22,
  paddingVertical: 13,
}
// Label: color white, fontWeight '700', fontSize 14
```

### Secondary / Ghost Button
```ts
{
  backgroundColor: 'rgba(255,255,255,0.08)',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.2)',
  paddingHorizontal: 22,
  paddingVertical: 13,
}
// Label: color white, fontWeight '700', fontSize 14
```

### Typography
```ts
// Screen title / hero heading
{ color: FourtecColors.white, fontSize: 28, fontWeight: '800' }

// Accent word inside heading (teal)
{ color: FourtecColors.teal }

// Section label (all-caps small label above heading)
{ color: FourtecColors.teal, fontSize: 11, fontWeight: '700', letterSpacing: 1.5 }

// Section heading
{ color: FourtecColors.white, fontSize: 22, fontWeight: '800' }

// Body / description text
{ color: FourtecColors.lightGray, fontSize: 14, lineHeight: 22 }
```

### List / Table Rows
```ts
{
  backgroundColor: FourtecColors.navyMid,
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255,255,255,0.05)',
  paddingHorizontal: 20,
  paddingVertical: 14,
}
// Primary cell text: color white, fontSize 15, fontWeight '600'
// Secondary/meta text: color FourtecColors.lightGray, fontSize 13
```

### Header (navigation bar)
- `backgroundColor`: `FourtecColors.navyDark`
- `headerTintColor`: `FourtecColors.white`
- Always show the Fourtec logo on the left via `headerLeft`

### Tab Bar
- `backgroundColor`: `FourtecColors.navyDark`
- `tabBarActiveTintColor`: `FourtecColors.teal`
- `tabBarInactiveTintColor`: `FourtecColors.lightGray`
- `borderTopColor`: `rgba(255,255,255,0.05)`
