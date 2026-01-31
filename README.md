# GA4 Practice Pack (multi‑página) — listo para chambear

Hola Cris 👊  
Este paquete es una web ficticia tipo e‑commerce **con varias páginas** y **eventos recomendados GA4** para que practiques **como en un trabajo real**:

- `page_view` manual con `page_title`, `page_location`, `page_referrer` y `page_category`
- E‑commerce GA4: `view_item_list`, `select_item`, `view_item`, `add_to_cart`, `view_cart`, `begin_checkout`, `add_shipping_info`, `add_payment_info`, `purchase`, `refund`
- Growth: `generate_lead`, `contact`, `file_download`
- Engagement: `scroll`, `share`, `subscribe`
- Custom demo: `support_message`, `consent_change`, `set_tier`
- User properties demo: `membership_tier`, `device_profile`

> Importante: GA4 **no siempre muestra Explore al toque** (puede demorar). Para ver instantáneo usa **Realtime** y **DebugView**.

---

## 0) Requisitos
- Tener una propiedad GA4 y un Web Data Stream (sitio web)
- Tener tu **Measurement ID** (formato `G-XXXXXXXXXX`)
- Tener instalado Python (o Node) para levantar un servidor local

---

## 1) Configurar tu Measurement ID
Edita el archivo:

- `ga4-config.js` → pega tu `G-...`

---

## 2) Levantar el sitio (NO usar file://)
Si lo abres como archivo local, GA4 puede fallar o verse raro. Mejor levanta servidor.

### Opción A (Python)
En la carpeta del proyecto:

```bash
python -m http.server 8080
```

Abre:
- `http://localhost:8080/index.html?debug=1`

### Opción B (Node)
```bash
npx http-server -p 8080
```

---

## 3) Validación rápida (para que “no se pierdan datos”)
1. En GA4: **Admin → DebugView**  
2. Abre el sitio con `?debug=1`
3. Haz click en botones y navega por páginas (para generar `page_view`)

También mira:
- **Reports → Realtime** (lo más rápido)
- **Explore** (puede tardar un rato)

---

## 4) Ruta de práctica (dominar hoy)
Haz esto en orden para producir datos “buenos”:

1. **Inicio** (`index.html`): envía `select_promotion`, `sign_up`, `search`, `click` outbound
2. **Catálogo** (`catalog.html`): `view_item_list` + `select_item`
3. **Producto** (`product.html`): `view_item` + `add_to_cart` + `add_to_wishlist`
4. **Carrito** (`cart.html`): `view_cart` + `begin_checkout`
5. **Checkout** (`checkout.html`): `add_shipping_info` + `add_payment_info` + `purchase`
6. **Gracias** (`thankyou.html`): `refund` (simulado)
7. **Soporte** (`support.html`): `generate_lead`, `contact`, `file_download`, `support_message`
8. **Blog** (`blog.html`): `scroll 90%`, `share`, `subscribe`
9. **Settings** (`settings.html`): consentimiento + tier

---

## 5) “Tarea chamba” (Explorations que sí o sí te piden en empresas)
En GA4 → Explore:

### A) Tabla de engagement por página
- Rows: `page_location` o `page_title`
- Values: `Views`, `Event count`, `Users`
- Filter: `event_name = page_view`

### B) Embudo e‑commerce
Funnel steps:
1) `view_item`  
2) `add_to_cart`  
3) `begin_checkout`  
4) `purchase`

### C) Campañas (Source / Medium / Campaign)
Abre la web con UTM, por ejemplo:
- `/index.html?utm_source=instagram&utm_medium=social&utm_campaign=promo_enero&debug=1`

Luego en Explore revisa:
- `Session source / medium`
- `Session campaign`

---

## 6) Custom definitions (para que parámetros salgan en Explore)
En Admin → Custom definitions → Create:

**Event‑scoped dimensions:**
- `item_category`
- `stock_state`
- `district`
- `shipping_tier`
- `payment_type`
- `intent`
- `message_len`
- `page_category`

**User‑scoped dimension:**
- `membership_tier`

> Ojo: algunas dimensiones estándar ya existen. Si ya están, no las dupliques.

---

## 7) Archivos principales
- `index.html` inicio + UTMs
- `catalog.html` lista de productos
- `product.html` detalle producto (usa querystring `item_id`)
- `cart.html` carrito (usa localStorage)
- `checkout.html` compra (genera `purchase`)
- `thankyou.html` confirmación
- `account.html` registro/login
- `support.html` leads + soporte
- `blog.html` scroll/share/subscribe
- `settings.html` consentimiento + tier
- `ga4-config.js` (pega tu Measurement ID)
- `ga4.js` (lógica eventos)
- `style.css` (UI simple tipo “dashboard”)

---

## 8) Si algo no aparece
- ¿Pusiste el `G-...` correcto?
- ¿Abriste con servidor (http://localhost) y no file://?
- ¿Probaste `?debug=1` y revisaste DebugView?
- ¿Creaste Custom definitions para parámetros nuevos?

---

## 9) Mini‑glosario (para que lo expliques)
- **Measurement ID (G-...)**: ID del stream web; el “destino” donde se manda tu data.
- **Event**: acción (page_view, add_to_cart, purchase).
- **Parameter**: detalle del evento (value, currency, item_category).
- **User property**: atributo del usuario (membership_tier).
- **Source/Medium**: de dónde vino la sesión (utm_source/utm_medium).
- **DebugView**: ver eventos casi en tiempo real cuando debug_mode está activo.

---

Si quieres, el siguiente paso es que te deje un “examen chamba” con 10 requerimientos y tú me entregas capturas de tus exploraciones.
