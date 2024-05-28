<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import CountryModal from '@/components/CountryModal.vue';
import type { Country } from '@/types/country'

const pageSize = 25;
const countries = ref<Country[]>([]);
const searchTerm = ref('');
const sortDirection = ref('asc');
const currentPage = ref(1);
const selectedCountry = ref<Country | null>(null);

const fetchData = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log(data);
        countries.value = data;
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    fetchData();
});

const filterCountries = () => {
    changePage(1);
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
    return countries.value.filter(country =>
        country.name.official.toLowerCase().includes(lowerCaseSearchTerm)
    );
};

const sortedCountries = computed(() => {
    const direction = sortDirection.value === 'asc' ? 1 : -1;
    return filterCountries().sort((a, b) =>
        a.name.official.localeCompare(b.name.official) * direction
    );
});

const totalPages = computed(() => Math.ceil(sortedCountries.value.length / pageSize));

const paginatedCountries = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return sortedCountries.value.slice(start, end);
});

const sortIcon = computed(() => (sortDirection.value === 'asc' ? '▲' : '▼'));

const sortCountries = () => {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
};

const changePage = (page: number) => {
    currentPage.value = page;
};

const openModal = (country: Country) => {
    selectedCountry.value = country;
};

const closeModal = () => {
    selectedCountry.value = null;
};

const clearSearch = () => {
    searchTerm.value = '';
};

</script>
<template>
    <div>
        <h1 class="font-bold text-2xl text-center py-10">Country Catalog</h1>

        <div class="flex flex-col gap-4 p-4">
            <div class="flex items-center gap-2">
                <input v-model="searchTerm" type="text" placeholder="Search by Country name"
                    class="p-2 border border-solid border-gray-400 rounded-md" />
                <button @click="clearSearch" class="bg-red-600 text-white px-4 py-2 rounded-md">Clear</button>
                <button @click="sortCountries" class="bg-blue-600 text-white px-4 py-2 rounded-md">
                    Sort {{ sortDirection === 'asc' ? 'desc' : 'asc' }}</button>
            </div>

            <table class="w-full border-collapse">
                <thead>
                    <tr class="bg-gray-200">
                        <th class="p-2 text-left">No.</th>
                        <th class="p-2 text-left">Flags</th>
                        <th class="p-2 text-left">
                            <button @click="sortCountries">Country Name {{ sortIcon }}</button>
                        </th>
                        <th class="p-2 text-left">2 character Country Code</th>
                        <th class="p-2 text-left">3 character Country Code</th>
                        <th class="p-2 text-left">Native Country Name</th>
                        <th class="p-2 text-left">Alternative Country Name</th>
                        <th class="p-2 text-left">Country Calling Codes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(country, index) in paginatedCountries" :key="country.cca3">
                        <td class="p-2 text-left">{{ index + 1 }}</td>
                        <td class="p-2 text-left">
                            <img :src="country.flags.png" :alt="country.name.official" width="50" height="30" />
                        </td>
                        <td class="p-2 text-left">
                            <button @click="openModal(country)" class="hover:underline">{{ country.name.official }}</button>
                        </td>
                        <td class="p-2 text-left">{{ country.cca2 }}</td>
                        <td class="p-2 text-left">{{ country.cca3 }}</td>
                        <td class="p-2 text-left">{{ country.name.nativeName?.eng?.official }}</td>
                        <td class="p-2 text-left">{{ country.altSpellings.join(', ') }}</td>
                        <td class="p-2 text-left">{{ country.idd.root }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="flex justify-end items-center flex-wrap gap-2">
                <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                    class="px-4 py-2  text-white rounded-md" :class="page === currentPage ? 'bg-red-400' : 'bg-red-600'">
                    {{ page }}
                </button>
            </div>
        </div>
        <CountryModal v-if="selectedCountry" :country="selectedCountry" @closeModal="closeModal" />
    </div>
</template>
