<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-primary">
    <!-- Left Column -->
    <aside class="md:col-span-1 space-y-6">
      <!-- Header -->
      <div class="text-center md:text-left">
        <h1 class="text-3xl font-bold text-primary leading-tight">{{ data.name }}</h1>
        <p class="text-accent text-lg font-semibold">{{ data.title }}</p>
      </div>

      <!-- Contact Info -->
      <div class="text-sm text-gray-700 space-y-1">
        <p>📍 {{ data.contact.location }}</p>
        <p>📧 {{ data.contact.email }}</p>
        <p>📱 {{ data.contact.phone }}</p>
        <p>💻 <a :href="'https://github.com/' + data.contact.github" class="text-accent hover:underline">GitHub</a></p>
        <p>🌐 <a :href="data.contact.portfolio" class="text-accent hover:underline">Portfolio</a></p>
        <p>📝 <a :href="data.contact.web" class="text-accent hover:underline">Web</a></p>
      </div>

      <!-- Skills -->
      <section>
        <h2 class="text-accent font-semibold border-b border-gray-200 pb-1 mb-2">Top Skills</h2>
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="(skill, i) in data.skills"
            :key="i"
            class="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ skill }}
          </li>
        </ul>
      </section>

      <!-- Education -->
      <section>
        <h2 class="text-accent font-semibold border-b border-gray-200 pb-1 mb-2">Education</h2>
        <div v-for="(edu, i) in data.education" :key="i" class="text-sm">
          <p class="font-semibold">{{ edu.institution }}</p>
          <p>{{ edu.degree }}</p>
          <p class="text-gray-500">{{ edu.year }}</p>
        </div>
      </section>

      <!-- Awards -->
      <section v-if="data.awards && data.awards.length">
        <h2 class="text-accent font-semibold border-b border-gray-200 pb-1 mb-2">Honors & Awards</h2>
        <ul class="list-disc list-inside text-sm">
          <li v-for="(award, i) in data.awards" :key="i">{{ award.title }}</li>
        </ul>
      </section>
    </aside>

    <!-- Right Column -->
    <section class="md:col-span-2 space-y-8">
      <!-- Summary -->
      <div>
        <h2 class="text-accent font-semibold border-b border-gray-200 pb-1 mb-2">Summary</h2>
        <p class="text-gray-700 leading-relaxed">{{ data.summary.replace("exp_year", `${new Date().getFullYear() - 2019}++`) }}</p>
      </div>

      <!-- Experience -->
      <div>
        <h2 class="text-accent font-semibold border-b border-gray-200 pb-1 mb-3">Experience</h2>
        <div
          v-for="(exp, i) in data.experience"
          :key="i"
          class="border-l-4 border-accent/40 pl-4 mb-6"
        >
          <div class="flex justify-between items-center flex-wrap gap-2">
            <h3 class="font-semibold text-lg">{{ exp.position }}</h3>
            <span class="text-sm text-gray-500">{{ exp.period }}</span>
          </div>
          <p class="text-sm text-gray-600 italic mb-1">
            {{ exp.company }} <span v-if="exp.location">– {{ exp.location }}</span>
          </p>
          <p class="text-gray-700 font-medium mb-2">{{ exp.role }}</p>
          <ul class="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li v-for="(r, j) in exp.responsibilities" :key="j">{{ r }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({
  data: Object,
});
</script>
