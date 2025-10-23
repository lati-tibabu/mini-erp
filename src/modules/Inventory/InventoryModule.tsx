import { useState } from 'react'
import './InventoryModule.css'

interface Product {
  id: number
  name: string
  sku: string
  category: string
  quantity: number
  price: number
  supplier: string
  lastUpdated: string
}

function InventoryModule() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Laptop Computer',
      sku: 'TECH-001',
      category: 'Electronics',
      quantity: 45,
      price: 1200,
      supplier: 'Tech Supplies Inc',
      lastUpdated: '2024-01-10'
    },
    {
      id: 2,
      name: 'Office Desk',
      sku: 'FURN-101',
      category: 'Furniture',
      quantity: 20,
      price: 350,
      supplier: 'Office Furniture Co',
      lastUpdated: '2024-01-08'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    price: 0,
    supplier: '',
    lastUpdated: ''
  })
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId !== null) {
      // Update existing product
      setProducts(products.map(prod => 
        prod.id === editingId ? { ...formData, id: editingId } as Product : prod
      ))
      setEditingId(null)
    } else {
      // Add new product
      const newProduct: Product = {
        ...formData,
        id: Math.max(...products.map(p => p.id), 0) + 1
      } as Product
      setProducts([...products, newProduct])
    }

    setShowForm(false)
    setFormData({
      name: '',
      sku: '',
      category: '',
      quantity: 0,
      price: 0,
      supplier: '',
      lastUpdated: ''
    })
  }

  const handleEdit = (product: Product) => {
    setFormData(product)
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(prod => prod.id !== id))
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: '',
      sku: '',
      category: '',
      quantity: 0,
      price: 0,
      supplier: '',
      lastUpdated: ''
    })
  }

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { text: 'Out of Stock', className: 'status-out' }
    if (quantity < 10) return { text: 'Low Stock', className: 'status-low' }
    return { text: 'In Stock', className: 'status-ok' }
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Inventory Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
          disabled={showForm}
        >
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingId !== null ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>SKU *</label>
                <input
                  type="text"
                  value={formData.sku || ''}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="number"
                  value={formData.quantity || ''}
                  onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                  required
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Price *</label>
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Supplier *</label>
                <input
                  type="text"
                  value={formData.supplier || ''}
                  onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Updated *</label>
                <input
                  type="date"
                  value={formData.lastUpdated || ''}
                  onChange={(e) => setFormData({...formData, lastUpdated: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId !== null ? 'Update' : 'Add'} Product
              </button>
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Supplier</th>
              <th>Last Updated</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const status = getStockStatus(product.quantity)
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.supplier}</td>
                  <td>{new Date(product.lastUpdated).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${status.className}`}>
                      {status.text}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(product)}
                        disabled={showForm}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(product.id)}
                        disabled={showForm}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="empty-state">
          <p>No products found. Click "Add Product" to get started.</p>
        </div>
      )}
    </div>
  )
}

export default InventoryModule
