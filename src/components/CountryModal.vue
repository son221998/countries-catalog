<script setup lang="ts">
import type { Country } from '@/types/country'
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{ country: Country }>();
const emits = defineEmits(['closeModal']);
const country = ref(props.country);

const closeModal = () => {
    emits('closeModal');
};
</script>

<template>
    <div class="fixed top-0 right-0 left-0 h-screen flex justify-center items-center z-50">
        <div class="relative flex bg-gray-200 p-10 rounded-md shadow-lg">
            <button type="button" @click="closeModal"
                class="absolute top-2 right-2 rounded-full bg-red-600 text-white leading-6 text-md w-6 h-6">
                &times;
            </button>
            <div class="flex flex-col gap-4">
                <h2 class="text-xl font-semibold">{{ country.name.official }}</h2>
                <p>
                    <strong>Capital:</strong> {{ country.capital !== undefined ? country.capital.join(', ') : 'No Capital'
                    }}
                </p>
                <p>
                    <strong>Language:</strong> {{ country.languages !== undefined ? country.languages : 'No Languages' }}
                </p>
                <p>
                    <strong>Population:</strong> {{ country.population }}
                </p>
                <p>
                    <strong>Region:</strong> {{ country.region }}
                </p>
                <p>
                    <strong>Subregion:</strong> {{ country.subregion !== undefined ? country.subregion : 'No Subregion' }}
                </p>
            </div>
        </div>
    </div>
</template>

  