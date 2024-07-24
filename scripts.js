function showLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('active');
    loader.style.display = 'flex';
}

// Function to hide the loader
function hideLoader() {
    const loader = document.getElementById('loader');
    loader.classList.remove('active');
    loader.style.display = 'none';
}


document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    
    // Function to fetch products from the backend
    showLoader() ; 
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://MovieSearch.cfapps.us10-001.hana.ondemand.com/getDetails');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const products = await response.json();
            hideLoader() ;
            displayProducts(products);
        } catch (error) {
            hideLoader() ; 
            console.error('Error fetching products:', error);
        }
    };

    // Function to display products
    const displayProducts = (products) => {
        productList.innerHTML = ''; // Clear existing products
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="data:${product.type};base64,${product.data}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price} (Offer: $${product.offer})</p>
                <p>Posted by: ${product.createdBy}</p>
                <p>Contact: ${product.contact}</p>
                <p>Rating: ${product.ratings}/5</p>
            `;
            productList.appendChild(productCard);
        });
    };

    // Fetch and display products on page load
    fetchProducts();
});
