import { useState } from 'react'
import './HRModule.css'

interface Employee {
  id: number
  name: string
  position: string
  department: string
  email: string
  phone: string
  salary: number
  joinDate: string
}

function HRModule() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: 'John Doe',
      position: 'Software Engineer',
      department: 'IT',
      email: 'john.doe@company.com',
      phone: '555-0101',
      salary: 75000,
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'HR Manager',
      department: 'Human Resources',
      email: 'jane.smith@company.com',
      phone: '555-0102',
      salary: 80000,
      joinDate: '2022-06-01'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    salary: 0,
    joinDate: ''
  })
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId !== null) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === editingId ? { ...formData, id: editingId } as Employee : emp
      ))
      setEditingId(null)
    } else {
      // Add new employee
      const newEmployee: Employee = {
        ...formData,
        id: Math.max(...employees.map(e => e.id), 0) + 1
      } as Employee
      setEmployees([...employees, newEmployee])
    }

    setShowForm(false)
    setFormData({
      name: '',
      position: '',
      department: '',
      email: '',
      phone: '',
      salary: 0,
      joinDate: ''
    })
  }

  const handleEdit = (employee: Employee) => {
    setFormData(employee)
    setEditingId(employee.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id))
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: '',
      position: '',
      department: '',
      email: '',
      phone: '',
      salary: 0,
      joinDate: ''
    })
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Human Resources Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
          disabled={showForm}
        >
          Add Employee
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingId !== null ? 'Edit Employee' : 'Add New Employee'}</h3>
          <form onSubmit={handleSubmit} className="employee-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Position *</label>
                <input
                  type="text"
                  value={formData.position || ''}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Department *</label>
                <input
                  type="text"
                  value={formData.department || ''}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Salary *</label>
                <input
                  type="number"
                  value={formData.salary || ''}
                  onChange={(e) => setFormData({...formData, salary: Number(e.target.value)})}
                  required
                  min="0"
                  step="1000"
                />
              </div>

              <div className="form-group">
                <label>Join Date *</label>
                <input
                  type="date"
                  value={formData.joinDate || ''}
                  onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId !== null ? 'Update' : 'Add'} Employee
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
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Salary</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>${employee.salary.toLocaleString()}</td>
                <td>{new Date(employee.joinDate).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(employee)}
                      disabled={showForm}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(employee.id)}
                      disabled={showForm}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {employees.length === 0 && (
        <div className="empty-state">
          <p>No employees found. Click "Add Employee" to get started.</p>
        </div>
      )}
    </div>
  )
}

export default HRModule
