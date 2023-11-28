// Import necessary modules from Vue
import { defineComponent, ref } from "vue";

// Define the registration component
export const register = defineComponent({
    setup() {
        // Define reactive data using ref
        const username = ref("");
        const email = ref("");
        const password = ref("");

        // Function to handle form submission
        const handleSubmit = () => {
            // Perform registration logic here
            console.log("Form submitted:", {
                username: username.value,
                email: email.value,
                password: password.value,
            });
        };

        // Return the render function
        return () => (
            <div>
                <h1>Register Page</h1>

                {/* Registration form */}
                <form>
                    <label>
                        Username:
                        {/* Use v-model to bind input to reactive data */}
                        <input v-model={username} type="text" />
                    </label>

                    <label>
                        Email:
                        <input v-model={email} type="email" />
                    </label>

                    <label>
                        Password:
                        <input v-model={password} type="password" />
                    </label>

                    {/* Handle form submission on button click */}
                    <button type="button" onClick={handleSubmit}>
                        Register
                    </button>
                </form>
            </div>
        );
    },
});
