import DynamicForm from './components/DynamicForm'

const formSchema = [
  { label: "Name", type: "text", name: "name", required: true, minLength: 3 },
  { label: "Email", type: "email", name: "email", required: true },
  { label: "Age", type: "number", name: "age", required: false, min: 18, max: 100 },
  { label: "Gender", type: "select", name: "gender", required: true, options: ["Male", "Female", "Other"] },
  { label: "Subscribe to newsletter", type: "checkbox", name: "subscribe", required: false }
]

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-center mb-6"> Dynamic Form Generator</h1>
      <DynamicForm schema={formSchema} />
    </div>
  )
}

export default App
