# Ejercicios tipo chamba (GA4) — entrega como si fuera trabajo

## 1) Explora “Top páginas”
Crea una Exploration (Free form) y entrega:
- Tabla con `page_title` (rows)
- `Views`, `Users`, `Event count` (values)
- Filtro: `event_name = page_view`

## 2) Funnel de compra
Funnel exploration:
- view_item → add_to_cart → begin_checkout → purchase
- Segmenta por `membership_tier` (bronze/silver/gold)

## 3) Campañas (source/medium)
Entra 3 veces con UTMs distintas (instagram, google cpc, email).
Luego arma tabla:
- Rows: `Session source / medium`
- Values: `Sessions`, `Purchases` (o `Event count` purchase)

## 4) Lead vs Purchase
Comparación:
- `generate_lead` vs `purchase`
- por `district`

## 5) Mensajes de soporte (custom)
Tabla:
- Rows: `intent`
- Values: `Event count`
- Filtro: `event_name = support_message`

## 6) Documento de QA (calidad)
Escribe 8 bullets:
- Qué eventos existen
- Qué parámetros clave tienen
- Qué conversiones propones (purchase, generate_lead, sign_up)
