const baseUrl = "https://restplayersalex.azurewebsites.net/api/players";

Vue.createApp({
    data() {
        return {
            Players: [],
            searchQuery: "",
            filteredPlayers: [],
            addPlayerData: { id: 0, firstName: "", lastName: "", number: 0, position: "" },
            updatePlayerData: { id: 0, firstName: "", lastName: "", number: 0, position: "" },
            deletePlayerData: { id: 0 },
            iDToGetBy: null,
            singlePlayer: null,
            sortAscendingNumber: true,
            showPlayersList: false // Add this property to control visibility of players list
        };
    },

    methods: {
        async getAllPlayers() {
            await this.helperGetAndShow(baseUrl);
            this.showPlayersList = true; // Show players list after fetching data
        },

        async helperGetAndShow(url) {
            try {
                const response = await axios.get(url);
                this.Players = response.data;
                this.filterPlayersByName();
            } catch (ex) {
                alert(ex.message);
            }
        },

        filterPlayersByName() {
            this.filteredPlayers = this.Players.filter(player =>
                player.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                player.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },

        async addPlayer() {
            try {
                await axios.post(baseUrl, this.addPlayerData);
                this.getAllPlayers();
            } catch (ex) {
                alert(ex.message);
            }
        },

        async updatePlayer() {
            try {
                await axios.put(`${baseUrl}/${this.updatePlayerData.id}`, this.updatePlayerData);
                this.getAllPlayers();
            } catch (ex) {
                alert(ex.message);
            }
        },

        async deletePlayer() {
            try {
                await axios.delete(`${baseUrl}/${this.deletePlayerData.id}`);
                this.getAllPlayers();
            } catch (ex) {
                alert(ex.message);
            }
        },

        async getPlayerById() {
            try {
                const response = await axios.get(`${baseUrl}/${this.iDToGetBy}`);
                this.singlePlayer = response.data;
            } catch (ex) {
                alert(ex.message);
            }
        },

        sortPlayersByNumber() {
            this.filteredPlayers.sort((a, b) => {
                return this.sortAscendingNumber ? a.number - b.number : b.number - a.number;
            });
            this.sortAscendingNumber = !this.sortAscendingNumber;
        },
    },

    watch: {
        searchQuery() {
            this.filterPlayersByName();
        },
    },

    mounted() {
        // this.getAllPlayers(); // Commented this out so the list won't load automatically
    },
}).mount("#app");
