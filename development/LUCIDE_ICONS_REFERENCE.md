# Lucide React Icons Quick Reference

This guide shows all lucide icons used to replace emojis in the BEB Fragrance admin panel.

## Icon Categories

### 📊 Financial/Revenue Icons
```tsx
import { DollarSign, CreditCard, Wallet } from 'lucide-react';

<DollarSign size={24} />    // Used for: Revenue, Money
<CreditCard size={24} />    // Used for: Payments, Cards
<Wallet size={24} />        // Alternative for money
```

### 📦 E-commerce Icons
```tsx
import { Package, ShoppingBag, ShoppingCart } from 'lucide-react';

<Package size={24} />       // Used for: Orders, Products
<ShoppingBag size={24} />   // Used for: Active Products
<ShoppingCart size={24} />  // Alternative for shopping
```

### 👥 User/People Icons
```tsx
import { Users, User, UserCircle, PeopleAlt } from 'lucide-react';

<Users size={24} />         // Used for: Multiple Users
<User size={16} />          // Single user profile
<UserCircle size={24} />    // User avatar alternative
```

### ⏱️ Time/Schedule Icons
```tsx
import { Clock, Calendar, CalendarDays, Hourglass, AlertCircle } from 'lucide-react';

<Clock size={24} />         // Used for: Pending Orders, Wait time
<Calendar size={16} />      // Used for: Date-related
<CalendarDays size={16} />  // Used for: Weekly
<Hourglass size={24} />     // Alternative for pending
```

### 📝 Document/Info Icons
```tsx
import { FileText, ClipboardList, Info, AlertCircle } from 'lucide-react';

<FileText size={16} />      // Used for: Orders, Documents
<ClipboardList size={16} /> // Alternative for lists
<Info size={16} />          // Used for: Information messages
<AlertCircle size={16} />   // Alternative for warnings
```

### 🎯 UI Control Icons
```tsx
import { X, Check, CheckCircle, Trash2, Edit, Eye } from 'lucide-react';

<X size={20} />             // Used for: Modal close button
<Check size={16} />         // Used for: Checkmarks
<CheckCircle size={16} />   // Used for: Active/Verified status
<Trash2 size={16} />        // Used for: Delete actions
<Edit size={16} />          // Used for: Edit actions
<Eye size={16} />           // Used for: View actions
```

### 🎨 Theme/Display Icons
```tsx
import { Sun, Moon, Palette } from 'lucide-react';

<Sun size={16} />           // Used for: Light mode toggle
<Moon size={16} />          // Used for: Dark mode toggle
<Palette size={16} />       // Alternative for theme
```

### 📸 Media Icons
```tsx
import { Camera, Image, ImagePlus } from 'lucide-react';

<Camera size={32} />        // Used for: Image upload
<Image size={24} />         // Alternative for gallery
<ImagePlus size={24} />     // Alternative for add image
```

---

## Usage Examples

### Basic Import & Usage
```tsx
import { DollarSign, Package, Users } from 'lucide-react';

export function DashboardStats() {
  return (
    <div>
      <StatCard
        icon={<DollarSign size={24} />}
        title="Revenue"
        value="$15,000"
      />
      <StatCard
        icon={<Package size={24} />}
        title="Orders"
        value="123"
      />
      <StatCard
        icon={<Users size={24} />}
        title="Users"
        value="456"
      />
    </div>
  );
}
```

### Inline Icons with Text
```tsx
import { FileText, Calendar } from 'lucide-react';

export function QuickLinks() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <FileText size={16} />
      <span>View Orders</span>
    </div>
  );
}
```

### Icon with Custom Styling
```tsx
import { DollarSign } from 'lucide-react';

export function CustomIcon() {
  return (
    <DollarSign 
      size={24} 
      stroke="currentColor"
      strokeWidth={2}
      style={{ color: '#10b981' }} // Green
    />
  );
}
```

---

## Size Standards Used

| Size | Usage | Typical |
|------|-------|---------|
| **16** | Small inline icons | Tags, labels, links |
| **20** | Close buttons | Modal/dialog close |
| **24** | Stat cards | Dashboard cards |
| **32** | Large upload areas | Dropzones, featured |
| **40+** | Hero sections | Not used in admin |

---

## Color Customization

Lucide icons inherit color from parent element or can be styled directly:

```tsx
// Inherit from parent
<div style={{ color: '#3b82f6' }}>
  <Package size={24} />  {/* Will be blue */}
</div>

// Direct styling
<DollarSign 
  size={24} 
  style={{ color: '#10b981' }}
/>

// Using CSS classes
<Package size={24} className="text-blue-500" />
```

---

## All Lucide Icons Used in Admin Panel

| Icon | File | Purpose |
|------|------|---------|
| `DollarSign` | dashboard, analytics | Revenue/money |
| `Package` | dashboard, analytics, user | Orders/products |
| `Clock` | dashboard | Pending/waiting |
| `Users` | dashboard, analytics, user | Users/people |
| `FileText` | dashboard | Document links |
| `CreditCard` | dashboard, user | Payments |
| `Calendar` | analytics | Date/today |
| `CalendarDays` | analytics | Weekly dates |
| `CheckCircle` | analytics | Status/active |
| `ShoppingBag` | analytics | Products |
| `Info` | settings | Information |
| `Sun` | settings | Light mode |
| `Moon` | settings | Dark mode |
| `Camera` | ProductImageUpload | Photo upload |
| `X` | AdminModal | Close button |

---

## Resources

- **Official Docs**: https://lucide.dev/
- **Icon Search**: https://lucide.dev/icons
- **React Component**: https://lucide.dev/guide/packages/lucide-react
- **GitHub**: https://github.com/lucide-icons/lucide

---

## Notes for Future Development

When adding new features to the admin panel:

1. Always prefer lucide-react icons over emojis
2. Maintain consistent icon sizing
3. Use semantic icon names (e.g., `Trash2` for delete, not a random icon)
4. Import only needed icons to reduce bundle size
5. Test icon visibility in both light and dark themes
6. Consider accessibility: use `aria-label` if needed

---

**Last Updated**: June 18, 2026
