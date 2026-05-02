<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>Work</h1>

<ul>
	{#each data.projects as project (project._id)}
		<li>
			<a href="/work/{project.slug.current}">{project.title}</a>
			— {project.role}
		</li>
	{/each}
</ul>
