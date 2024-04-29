<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { Page, UnparseableWebhook } from '$lib/types';
    import api from '$lib/api';
    import '$css/table.css';
    import '$css/grid.css';

    let pageNumber = 1;

    let storedPage: Page<UnparseableWebhook>;

    async function getItemsAndStoreThem() {
        storedPage = await api.getUnparseableWebhooks(pageNumber, 15);
        console.dir(storedPage);
        return storedPage;
    }

    let itemPromise = getItemsAndStoreThem();

    async function deleteAll() {
        await api.deleteUnparseableWebhooks();
        itemPromise = getItemsAndStoreThem();
    }

    async function copy(text: string) {
        await navigator.clipboard.writeText(text);
    }

    async function gotoPrevious() {
        pageNumber -= 1;
        await getItemsAndStoreThem();
    }

    async function gotoNext() {
        pageNumber += 1;
        await getItemsAndStoreThem();
    }
</script>

<div class="text-column">
    <h3>Users</h3>

    {#await itemPromise}
        <p class="p-white">...loading items</p>
        <!-- eslint-disable @typescript-eslint/no-unused-vars -->
    {:then page}
        <div class="mb-3 row">
            <span class="col-sm-1">Bulk actions:</span>
            <button type="button" on:click={deleteAll} class="col-sm-1 btn btn-danger"
            >Delete all
            </button
            >
        </div>

        <table class="table">
            <thead>
            <tr>
                <th scope="col">Created at</th>
                <th scope="col">Origin</th>
                <th scope="col">Event</th>
                <th scope="col">Error</th>
                <th scope="col" class="clipped">Payload</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {#each storedPage.data as item}
                <tr>
                    <td>{item.created_at.toISOString()}</td>
                    <td>{item.origin}</td>
                    <td>{item.event}</td>
                    <td>{item.error}</td>
                    <td class="clipped">{item.payload}</td>
                    <td>
                        <button type="button" class="btn-smooth" aria-label="Copy to clipboard"
                                on:click={() => copy(item.payload)}>
                            <Icon icon="mingcute:copy-2-line" inline />
                        </button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
        {#if page.total_page > 1}
            <div class="row-centered">
                <div class="col-auto">
                    {#if pageNumber > 1}
                        <button type="button" class="btn-smooth btn-pagination" aria-label="Previous" on:click={gotoPrevious}>
                            <Icon icon="grommet-icons:caret-previous" inline />
                        </button>
                    {/if}
                </div>
                <div class="col-auto">
                    Page {pageNumber}
                </div>
                <div class="col-auto">
                    {#if pageNumber < page.total_page}
                        <button type="button" class="btn-smooth btn-pagination" aria-label="Next" on:click={gotoNext}>
                            <Icon icon="grommet-icons:caret-next" inline />
                        </button>
                    {/if}
                </div>
            </div>
        {/if}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>

<style>
    .clipped {
        word-wrap: break-word;
        max-width: 150px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .btn-smooth {
        background: none;
        border: none;
    }

    .btn-smooth:hover {
        background: lightgray;
        border-radius: 6px;
    }

    .btn-pagination {
        color: cornflowerblue;
        font-size: 43px;
    }

    .col-auto {
        display: flex;
        justify-content: center;

    }
</style>
