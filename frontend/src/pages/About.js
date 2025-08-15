import React, { useState } from 'react';
import { FaTags, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

const categories = [
  "Sports",
  "Stationery",
  "Fashion",
  "Books",
  "Kitchen",
  "Appliances",
  "Grocery",
  "Mobiles",
  "Toys",
  "Beauty",
  "Bathroom",
  "Laptops",
  "Electronics",
  "Home",
];

const brands = [
  { name: "Adidas", category: "Sports", image: "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg" },
  { name: "Camlin", category: "Stationery", image: "https://vectorseek.com/wp-content/uploads/2023/09/Camlin-Logo-Vector.svg-.png" },
  { name: "Philips", category: "Appliances", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Philips_logo_new.svg/2560px-Philips_logo_new.svg.png" },
  { name: "Cello", category: "Stationery", image: "https://laxmimegamart.com/image/cache/catalog/picture/brand/cello-600x315.png" },
  { name: "Puma", category: "Sports", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAACenp7f39/Ozs7r6+vi4uJfX1/IyMg6OjonJyfb29tVVVWRkZHu7u4VFRWlpaXAwMCXl5f5+fmoqKi6urpoaGgfHx95eXnU1NSysrJCQkKHh4dQUFAKCgpZWVkqKipJSUlmZmYxMTFycnJ8fHwZGRnlG5wGAAAEDElEQVR4nO3b6XqiMBiGYYKirVpUcKlbW63T8z/EEdkCBEUlbNdz/+pUYr9XIRuMYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAohz2ou4J7lkOjJ+xnW292QqzKLEeDtfhci9OTjc/C0yu1oLLtrzWKT3P++Pdo/fqNxxrqKsvgIGKH7WONranf7svVU1wp5IBerc4DxbrroNVCX30vc0XGrHDj76CFo7HAV9nv2YRi1C/WeOsffmr0YLFSBPR6nUKNr4euGp3PMObqhGK9ud/WuRw3fdNf44vGPzkZzXstvSv42OQ+NGRf+sO1KuLwTvUzId6rKfFVbt8yLNX1OLJutruM9U/P9GpgK8/UWxdj/5FhpV7WZjMwNuqL8cYU5yRG1dX4AtuflH7ldDf5Y7klxLzKQp81yEsWOee03IvfSit9Vs6ALzsou1Tr5hncIN5geLwTc6paGU3EtPJin2JeEvQN+yPOM/rIZsxejJfpzEcN5T7DFOvrWbgIVrI713jLRvxJTcW9KXebxkLfYLv/51yT9BWn6kQeGp0bPVA7qCKK4zL41jZH0cqvMGGs7nN2n+Zs7y8oCyw9ms0+qDOGCi6RG235l5/vt+GL3qLmk5yA67orK9Hbx2qnmLK2ZSh8gLU9JiI2e4f7SYkNnX91V6OFLW911F2MHvJKq/XDoZoTJ7y7EddObtyttntWmi9eWLVjff84q+tdjWEMo4T697oHjpmxuK5oFuE/t5crJ/zZX/iNZ9lGkqX/1tYi/cIsnIfGy6rbm8VlUC7hrnON6D7EQd7n9To/U9lGsst95yC8EU1V9d/VVif0SoxuCE5SCS1lkwTvc1DewwjPymhM1D8gqhOKWwkV+y9pw9zPITxPwzGxyu9weD4+nHAlNZmeRzkJD3HHEiU0jtUn7ElXR8GEC7lJTzoqkfAcPYciJ7S/wreoLOFGnk4VS9iTmngbu9GXmEi4kBcU8are38PR/3jJSwnH0vQkP+FMnTB4n2J3+tuZ0Fhef/OteT+xzoThH9d7otaaMHgKR++YWG9Cf4aqd9O07oSO0L0Mrjuh117vvmkTEup9YK/uhGb45zqbcB4c3t2EdnBEdxMaJ6F5+l17QvtP83BRe0LDdSZany1NrA9/tSRcyE2qvycaJ1zHS/RyE/6NRvGeTZ0JE8pMmNCUhIeuJ/wadDLhPtrI3l6XpKUlXM1mn41ImN7X615fml5pv0vl6hwPG5Awfd+iewnFmxvv6HYzoYyEbUoYn5mycesSxuVmdi2/RZZppBLGn4MR/C87z0FOaIa7257qn/Nyx71AdufZ7qW5mSbxMZdXBuHP3r3r6AX70iT5DgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBX/QfD/zoiFjqScAAAAABJRU5ErkJggg==" },
  { name: "Yonex", category: "Sports", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Logo-Yonex.svg/2560px-Logo-Yonex.svg.png" },
  { name: "The Man Company", category: "Beauty", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/TheManCompany_Logo.png" },
  { name: "Classmate", category: "Stationery", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNJncPCcpIFL88eiFf14Bo1-KpgPXDO5Y5yw&s" },
  { name: "Zara", category: "Fashion", image: "https://download.logo.wine/logo/Zara_(retailer)/Zara_(retailer)-Logo.wine.png" },
  { name: "H&M", category: "Fashion", image: "https://logos-world.net/wp-content/uploads/2020/04/HM-Logo.png" },
  { name: "Hamleys", category: "Toys", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEGEbWP6JU3vy7UyBNgPefcJT2FSM2O2g1Xg&s" },
  { name: "Sony", category: "Electronics", image: "https://i0.wp.com/www.dafontfree.io/wp-content/uploads/2021/08/Sony-Logo-Font.jpg?resize=1100%2C800&ssl=1" },
  { name: "U.S. Polo Assn.", category: "Fashion", image: "https://1000logos.net/wp-content/uploads/2021/04/U.S.-Polo-Assn-logo.png" },
  { name: "Kohler", category: "Bathroom", image: "https://kohler.scene7.com/is/image/Kohler/KohlerLogoImage?$CorpSecondary$&crop=110,0,23778,16000&wid=590&hei=397" },
  { name: "Nike", category: "Sports", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWSajV_8qBlAlBID07viDWp3xCHO_L092xCQ&s" },
  { name: "Jaquar", category: "Bathroom", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8-NJwkRnTz-DXDGhN9ybPady_Owm4pXl9pA&s" },
  { name: "Apple", category: "Electronics", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCvh-j7HsTHJ8ZckknAoiZMx9VcFmsFkv72g&s" },
  { name: "Levi's", category: "Fashion", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwvb2v2L5X52bVkw7m7J8jV8imi4KRAsIZZQ&s" },
  { name: "Whirlpool", category: "Appliances", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Whirlpool_Corporation_Logo_%28as_of_2017%29.svg/1200px-Whirlpool_Corporation_Logo_%28as_of_2017%29.svg.png" },
  { name: "Plum", category: "Beauty", image: "https://plumgoodness.com/cdn/shop/files/Nerw_Plum_Logo_400x400_2736c89d-cd7d-4211-a16c-352f38d35a84_400x.progressive.webp.jpg?v=1729663731" },
  { name: "Beardo", category: "Beauty", image: "https://ifuzefvpmposztzwzxmh.supabase.co/storage/v1/object/public/coupons/beardo%20logo.png1709526046083" },
  { name: "Funskool", category: "Toys", image: "https://via.placeholder.com/50x50?text=Funskool" },
  { name: "OnePlus", category: "Electronics", image: "https://via.placeholder.com/50x50?text=OnePlus" },
  { name: "Luxor", category: "Stationery", image: "https://via.placeholder.com/50x50?text=Luxor" },
  { name: "Hindware", category: "Bathroom", image: "https://via.placeholder.com/50x50?text=Hindware" },
  { name: "Decathlon", category: "Sports", image: "https://via.placeholder.com/50x50?text=Decathlon" },
  { name: "HP", category: "Electronics", image: "https://via.placeholder.com/50x50?text=HP" },
  { name: "Samsung", category: "Electronics", image: "https://via.placeholder.com/50x50?text=Samsung" },
];

export default function About() {
  const [showBrands, setShowBrands] = useState(false);

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>About Shopnix</h1>

      {/* About Section */}
      <section style={styles.section}>
        <h2 style={styles.heading}><FaTags style={styles.icon} /> Our Story</h2>
        <p style={styles.paragraph}>
          Founded in 2025, Shopnix is your one-stop ecommerce destination, designed to bring the best of shopping directly to your fingertips. We believe in offering a seamless, reliable, and diverse shopping experience that caters to every lifestyle and need.
        </p>
      </section>

      {/* Categories */}
      <section style={styles.section}>
        <h2 style={styles.heading}><MdCategory style={styles.icon} /> Shop by Category</h2>
        <ul style={styles.categoryList}>
          {categories.map((cat, i) => (
            <li key={i} style={styles.categoryItem}>{cat}</li>
          ))}
        </ul>
      </section>

      {/* Brands */}
      <section style={styles.section}>
        <h2 style={styles.heading}>
          <FaTags style={styles.icon} /> In Collaboration with Shopnix
        </h2>
        <button
          style={styles.dropdownBtn}
          onClick={() => setShowBrands(!showBrands)}
        >
          {showBrands ? "Hide Brands" : "Show Brands"}{" "}
          {showBrands ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        <div
          style={{
            ...styles.dropdownContent,
            maxHeight: showBrands ? "1000px" : "0px",
            opacity: showBrands ? 1 : 0,
            transition: "all 0.5s ease-in-out",
          }}
        >
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>Brand</th>
                <th style={styles.tableCell}>Category</th>
              </tr>
            </thead>
            <tbody>
              {brands.map(({ name, category, image }, i) => (
                <tr key={i} style={styles.tableRow}>
                  <td style={styles.tableCell}>
                    <img src={image} alt={name} style={styles.brandLogo} /> {name}
                  </td>
                  <td style={styles.tableCell}>{category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: 900,
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  section: {
    marginTop: 40,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    color: '#333',
  },
  icon: {
    marginRight: 8,
    color: '#0070f3',
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    lineHeight: 1.6,
  },
  categoryList: {
    columns: 2,
    listStyleType: 'disc',
    paddingLeft: 20,
  },
  categoryItem: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  dropdownBtn: {
    padding: '10px 16px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 16,
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  dropdownContent: {
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#0070f3',
    color: 'white',
  },
  tableCell: {
    padding: 8,
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  brandLogo: {
    width: 30,
    height: 30,
    objectFit: 'contain',
    verticalAlign: 'middle',
    marginRight: 8,
  },
};
