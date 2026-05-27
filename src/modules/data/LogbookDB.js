export const LogbookDB = {
    async init() {
        if (!localStorage.getItem('uki_logbook_db')) {
            localStorage.setItem('uki_logbook_db', JSON.stringify([]));
        }
        console.log("LogbookDB initialized (Local Storage Mode).");
    },
    
    async getAllLogs() {
        try {
            const data = localStorage.getItem('uki_logbook_db');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Failed to parse logbook data", e);
            return [];
        }
    },
    
    async addLog(logData) {
        const logs = await this.getAllLogs();
        logData.id = Date.now(); // Simple unique ID
        logs.push(logData);
        localStorage.setItem('uki_logbook_db', JSON.stringify(logs));
        return logData;
    }
};
