import { defineComponent } from "vue";

export const App = defineComponent({
    setup() {
        return () => (
            <>
                <router-view />
            </>
        );
    },
});
