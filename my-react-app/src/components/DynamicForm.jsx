import React, { useState } from 'react'

const DynamicForm = ({ schema }) => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [submittedData, setSubmittedData] = useState(null)

    const handleChange = (e, field) => {
        const { name, type, checked, value } = e.target
        const val = type === 'checkbox' ? checked : value
        setFormData({ ...formData, [name]: val })
    }

    const validate = () => {
        const newErrors = {}

        schema.forEach(field => {
            const value = formData[field.name]

            if (field.required && (value === undefined || value === '')) {
                newErrors[field.name] = 'This field is required'
                return
            }

            if (field.type === 'text' || field.type === 'email') {
                if (field.minLength && value?.length < field.minLength) {
                    newErrors[field.name] = `Minimum ${field.minLength} characters`
                }
                if (field.maxLength && value?.length > field.maxLength) {
                    newErrors[field.name] = `Maximum ${field.maxLength} characters`
                }
            }

            if (field.type === 'number') {
                if (value !== undefined) {
                    const num = Number(value)
                    if (field.min !== undefined && num < field.min) {
                        newErrors[field.name] = `Minimum value is ${field.min}`
                    }
                    if (field.max !== undefined && num > field.max) {
                        newErrors[field.name] = `Maximum value is ${field.max}`
                    }
                }
            }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            setSubmittedData(formData)
            console.log('Submitted:', formData)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
            {schema.map(field => (
                <div key={field.name}>
                    <label className="block font-medium mb-1">
                        {field.label}{field.required && <span className="text-red-500">*</span>}
                    </label>

                    {field.type === 'select' ? (
                        <select
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleChange(e, field)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select</option>
                            {field.options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            value={field.type === 'checkbox' ? undefined : formData[field.name] || ''}
                            checked={field.type === 'checkbox' ? formData[field.name] || false : undefined}
                            onChange={(e) => handleChange(e, field)}
                            className="w-full border rounded px-3 py-2"
                        />
                    )}

                    {errors[field.name] && (
                        <p className="text-sm text-red-500">{errors[field.name]}</p>
                    )}
                </div>
            ))}

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>

            {submittedData && (
                <div className="mt-6 bg-gray-100 p-4 rounded">
                    <h2 className="text-lg font-bold mb-2">Form Submitted Data:</h2>
                    <pre className="text-sm">{JSON.stringify(submittedData, null, 2)}</pre>
                </div>
            )}
        </form>
    )
}

export default DynamicForm
