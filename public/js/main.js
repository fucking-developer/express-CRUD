const API_URL = "http://localhost:3000/api/v1/usuarios";

// Elementos DOM
const userTable = document.getElementById("userTable");
const userForm = document.getElementById("userForm");
let editingUserId = null; // ID del usuario en edición

// Obtener y renderizar usuarios
const getUsuarios = async () => {
    try {
        const response = await axios.get(API_URL);
        renderUsuarios(response.data);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
};

// Renderizar usuarios en la tabla
const renderUsuarios = (usuarios) => {
    userTable.innerHTML = ""; // Limpiar la tabla
    usuarios.forEach(usuario => {
        const row = `
            <tr>
                <td class="border border-gray-300 p-2">${usuario._id}</td>
                <td class="border border-gray-300 p-2">${usuario.username}</td>
                <td class="border border-gray-300 p-2">${usuario.displayName}</td>
                <td class="border border-gray-300 p-2 space-x-2">
                    <button class="bg-blue-500 hover:bg-red-600 text-white px-3 py-1 rounded" onclick="startEditUsuario('${usuario._id}', '${usuario.username}', '${usuario.displayName}')">Editar</button>
                    <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onclick="deleteUsuario('${usuario._id}')">Eliminar</button>
                </td>
            </tr>
        `;
        userTable.innerHTML += row;
    });
};

// Crear o actualizar usuario
userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const displayName = document.getElementById("displayName").value;

    try {
        if (editingUserId) {
            // Actualizar usuario
            const response = await axios.put(`${API_URL}/${editingUserId}/actualizar`, { username, displayName });
            console.log("Usuario actualizado:", response.data);
        } else {
            // Crear usuario
            const response = await axios.post(`${API_URL}/crear`, { username, displayName });
            console.log("Usuario creado:", response.data);
        }

        getUsuarios(); // Recargar lista
        userForm.reset(); // Limpiar formulario
        editingUserId = null; // Reiniciar ID de edición
    } catch (error) {
        console.error("Error al guardar usuario:", error);
    }
});

// Eliminar usuario
const deleteUsuario = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}/eliminar`);
        console.log("Usuario eliminado:", response.data);
        getUsuarios(); // Recargar lista
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
    }
};

// Preparar formulario para editar usuario
const startEditUsuario = (id, username, displayName) => {
    editingUserId = id; // Guardar ID del usuario en edición
    document.getElementById("username").value = username;
    document.getElementById("displayName").value = displayName;
};

// Cargar usuarios al inicio
document.addEventListener("DOMContentLoaded", getUsuarios);
