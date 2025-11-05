const templateMap = {
    2: [{ img: "./imgs/tpl2_1.webp" }],
    3: [{ img: "./imgs/tpl3_1.webp" }, { img: "./imgs/tpl3_2.webp" }],
    4: [
        { img: "./imgs/tpl4_1.webp" },
        { img: "./imgs/tpl4_2.webp" },
        { img: "./imgs/tpl4_3.webp" },
    ],
    5: [
        { img: "./imgs/tpl5_1.webp" },
        { img: "./imgs/tpl5_2.webp" },
        { img: "./imgs/tpl5_3.webp" },
        { img: "./imgs/tpl5_4.webp" },
    ],
};

const avatars = document.querySelectorAll(".avatar");
const templateSection = document.getElementById("templateSection");

// 保存当前选中的头像
const selectedAvatars = new Set();

avatars.forEach((avatar, index) => {
    avatar.addEventListener("click", () => {
        // 切换选中状态
        if (selectedAvatars.has(index)) {
            selectedAvatars.delete(index);
            avatar.classList.remove("selected");
        } else {
            selectedAvatars.add(index);
            avatar.classList.add("selected");
        }

        updateTemplates();
    });
});

function updateTemplates() {
    const count = selectedAvatars.size;
    const templates = templateMap[count] || [];
    templateSection.innerHTML = "";

    if (templates.length === 0) {
        templateSection.innerHTML = `<div class="no-template">暂无 ${count} 人模板</div>`;
        return;
    }

    templates.forEach((tpl) => {
        const img = document.createElement("img");
        img.src = tpl.img;
        templateSection.appendChild(img);
    });
}
