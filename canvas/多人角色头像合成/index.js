const templateMap = {
    2: [
        {
            img: "./imgs/tpl2_1.webp",
            templateId: 1,
            pathList: [
                // 左侧人物
                [
                    { x: 0, y: 0 },
                    { x: 90, y: 0 },
                    { x: 60, y: 150 },
                    { x: 0, y: 150 },
                ],
                // 右侧人物
                [
                    { x: 92, y: 0 },
                    { x: 150, y: 0 },
                    { x: 150, y: 150 },
                    { x: 62, y: 150 },
                ],
            ],
        },
    ],
    3: [
        // 模板1：左右 + 中心偏上
        {
            img: "./imgs/tpl3_1.webp",
            templateId: 2,
            pathList: [
                // 左
                [
                    { x: 0, y: 0 },
                    { x: 60, y: 0 },
                    { x: 30, y: 150 },
                    { x: 0, y: 150 },
                ],
                // 中
                [
                    { x: 62, y: 0 },
                    { x: 120, y: 0 },
                    { x: 90, y: 150 },
                    { x: 32, y: 150 },
                ],
                // 右
                [
                    { x: 122, y: 0 },
                    { x: 150, y: 0 },
                    { x: 150, y: 150 },
                    { x: 92, y: 150 },
                ],
            ],
        },
        // 模板2：上中下布局（更具变化）
        {
            img: "./imgs/tpl3_2.webp",
            templateId: 3,
            pathList: [
                // 左侧矩形
                [
                    { x: 0, y: 0 },
                    { x: 74, y: 0 },
                    { x: 74, y: 150 },
                    { x: 0, y: 150 },
                ],
                // 右上正方形
                [
                    { x: 76, y: 0 }, // +2px 分隔线
                    { x: 150, y: 0 },
                    { x: 150, y: 74 },
                    { x: 76, y: 74 },
                ],
                // 右下正方形
                [
                    { x: 76, y: 76 }, // +2px 分隔线
                    { x: 150, y: 76 },
                    { x: 150, y: 150 },
                    { x: 76, y: 150 },
                ],
            ],
        },
    ],

    4: [
        // 模板1：上下两行（每行两人）
        {
            img: "./imgs/tpl4_1.webp",
            templateId: 4,
            pathList: [
                // 左矩形
                [
                    { x: 0, y: 0 },
                    { x: 40, y: 0 },
                    { x: 30, y: 150 },
                    { x: 0, y: 150 },
                ],

                // 左中平行四边形（右倾）
                [
                    { x: 42, y: 0 },
                    { x: 82, y: 0 },
                    { x: 72, y: 150 },
                    { x: 32, y: 150 },
                ],

                // 右中平行四边形（右倾）
                [
                    { x: 84, y: 0 },
                    { x: 124, y: 0 },
                    { x: 114, y: 150 },
                    { x: 74, y: 150 },
                ],

                // 右矩形
                [
                    { x: 126, y: 0 },
                    { x: 150, y: 0 },
                    { x: 150, y: 150 },
                    { x: 116, y: 150 },
                ],
            ],
        },
        // 模板2：四象限 + 少许倾斜
        {
            img: "./imgs/tpl4_2.webp",
            templateId: 5,
            pathList: [
                // 左半部分（左矩形）
                [
                    { x: 0, y: 0 },
                    { x: 74, y: 0 },
                    { x: 74, y: 150 },
                    { x: 0, y: 150 },
                ],

                // 右上矩形
                [
                    { x: 76, y: 0 },
                    { x: 150, y: 0 },
                    { x: 150, y: 48.7 },
                    { x: 76, y: 48.7 },
                ],

                // 右中矩形
                [
                    { x: 76, y: 50.7 },
                    { x: 150, y: 50.7 },
                    { x: 150, y: 99.4 },
                    { x: 76, y: 99.4 },
                ],

                // 右下矩形
                [
                    { x: 76, y: 101.4 },
                    { x: 150, y: 101.4 },
                    { x: 150, y: 150 },
                    { x: 76, y: 150 },
                ],
            ],
        },
        // 模板3：四人环形布局
        {
            img: "./imgs/tpl4_3.webp",
            templateId: 6,
            pathList: [
                // 左上
                [
                    { x: 0, y: 0 },
                    { x: 74, y: 0 },
                    { x: 74, y: 74 },
                    { x: 0, y: 74 },
                ],
                // 右上
                [
                    { x: 76, y: 0 }, // +2px 间隔
                    { x: 150, y: 0 },
                    { x: 150, y: 74 },
                    { x: 76, y: 74 },
                ],
                // 左下
                [
                    { x: 0, y: 76 }, // +2px 间隔
                    { x: 74, y: 76 },
                    { x: 74, y: 150 },
                    { x: 0, y: 150 },
                ],
                // 右下
                [
                    { x: 76, y: 76 }, // +2px 间隔
                    { x: 150, y: 76 },
                    { x: 150, y: 150 },
                    { x: 76, y: 150 },
                ],
            ],
        },
    ],
};

window.addEventListener("DOMContentLoaded", () => {
    const canvas = new fabric.Canvas("avatarCanvas", {
        width: 150,
        height: 150,
        backgroundColor: "#000",
        selection: false,
    });
    window.fabricCanvas = canvas;
});

const avatars = document.querySelectorAll(".avatar");
const templateSection = document.getElementById("templateSection");

const selectedAvatars = new Set();
let selectedTemplate = 0;

// ---------------- 更新模板列表 ----------------
function updateTemplates() {
    const count = selectedAvatars.size;
    const templates = templateMap[count] || [];
    templateSection.innerHTML = "";

    if (templates.length === 0) {
        // templateSection.innerHTML = `<div class="no-template">暂无 ${count} 人模板</div>`;
        // selectedTemplate = 0;
        return;
    }

    templates.forEach((tpl) => {
        const img = document.createElement("img");
        img.src = tpl.img;
        img.classList.add("template");

        if (tpl.templateId === selectedTemplate) {
            img.classList.add("selected");
        }

        img.addEventListener("click", () => {
            document
                .querySelectorAll(".template")
                .forEach((el) => el.classList.remove("selected"));
            img.classList.add("selected");
            selectedTemplate = tpl.templateId;
            console.log("✅ 选中模板：", selectedTemplate);
            composeOnCanvas();
        });

        templateSection.appendChild(img);
    });
}

// ---------------- 头像选择 ----------------
avatars.forEach((avatar, index) => {
    avatar.addEventListener("click", () => {
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

// ---------------- 合成逻辑（覆盖模式 Cover） ----------------
async function composeOnCanvas() {
    const canvas = window.fabricCanvas;
    if (!canvas) return;

    canvas.clear();
    canvas.setBackgroundColor("#000", canvas.renderAll.bind(canvas));

    const count = selectedAvatars.size;
    if (!selectedTemplate || count === 0) return;

    const tpl = templateMap[count]?.find(
        (t) => t.templateId === selectedTemplate
    );

    if (!tpl || !tpl.pathList || tpl.pathList.length === 0) {
        console.warn("⚠️ 当前模板未定义 pathList:", selectedTemplate);
        return;
    }

    const polygons = tpl.pathList;
    const avatarsArr = Array.from(selectedAvatars);
    const usedAvatars = avatarsArr.slice(0, polygons.length);

    // 加载头像图片
    const loadImg = (src) =>
        new Promise((resolve) => {
            fabric.Image.fromURL(src, (img) => resolve(img), {
                crossOrigin: "anonymous",
            });
        });

    const avatarImgs = await Promise.all(
        usedAvatars.map((i) => loadImg(avatars[i].src))
    );

    polygons.forEach((points, idx) => {
        const poly = new fabric.Polygon(points, {
            fill: "transparent",
            selectable: false,
            stroke: "#ccc",
            strokeWidth: 1,
        });

        const img = avatarImgs[idx];
        if (!img) return;

        const bbox = poly.getBoundingRect();

        // 原图宽高
        const imgW = img.width;
        const imgH = img.height;

        // 目标区域宽高
        const targetW = bbox.width;
        const targetH = bbox.height;

        // 计算“cover”模式比例（覆盖填充）
        const scaleX = targetW / imgW;
        const scaleY = targetH / imgH;
        const scale = Math.max(scaleX, scaleY); // 👈 用 max() 保证填满

        // 缩放后尺寸
        const scaledW = imgW * scale;
        const scaledH = imgH * scale;

        // 让图片中心与裁剪区域中心对齐
        const centerX = bbox.left + targetW / 2;
        const centerY = bbox.top + targetH / 2;

        const offsetX = centerX - scaledW / 2;
        const offsetY = centerY - scaledH / 2;

        // 设置图片缩放、位置与裁剪路径
        img.set({
            scaleX: scale,
            scaleY: scale,
            left: offsetX,
            top: offsetY,
            clipPath: new fabric.Polygon(points, {
                absolutePositioned: true,
            }),
        });

        canvas.add(img);
    });

    canvas.renderAll();
    console.log("🎨 覆盖模式合成完成（cover）！");
}
