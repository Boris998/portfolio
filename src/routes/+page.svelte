<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>Home</h1>

<ul>
	{#each data.featuredProjects as project (project._id)}
		<li>{project.title}</li>
	{/each}
</ul>
