# -*- coding: utf-8 -*-
import os
import zipfile
import shutil

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
RELEASES_DIR = os.path.join(BASE_DIR, "releases")
os.makedirs(RELEASES_DIR, exist_ok=True)

def create_zip(zip_name, source_paths):
    target_zip = os.path.join(RELEASES_DIR, zip_name)
    with zipfile.ZipFile(target_zip, "w", zipfile.ZIP_DEFLATED) as z:
        for src in source_paths:
            abs_src = os.path.join(BASE_DIR, src)
            if os.path.isfile(abs_src):
                arcname = os.path.relpath(abs_src, BASE_DIR)
                z.write(abs_src, arcname)
            elif os.path.isdir(abs_src):
                for root, _, files in os.walk(abs_src):
                    for file in files:
                        full = os.path.join(root, file)
                        arcname = os.path.relpath(full, BASE_DIR)
                        z.write(full, arcname)
    size = os.path.getsize(target_zip)
    print(f"Created {zip_name} ({size:,} bytes)")
    return target_zip

print("Packaging release archives for Way #30...")

# Pack 1
p1 = create_zip("pack1_clinical_directory_engine_v1.0.zip", ["engine/clinical_directory"])
shutil.copy2(p1, os.path.join(RELEASES_DIR, "pack1_clinical_directory_v1.0.zip"))
print("Aliased: pack1_clinical_directory_v1.0.zip")

# Pack 2
p2 = create_zip("pack2_ai_tools_directory_engine_v1.0.zip", ["engine/ai_tools_directory"])
shutil.copy2(p2, os.path.join(RELEASES_DIR, "pack2_ai_tools_directory_v1.0.zip"))
print("Aliased: pack2_ai_tools_directory_v1.0.zip")

# Pack 3
p3 = create_zip("pack3_directory_monetization_kit_v1.0.zip", ["monetization_directory_kit"])
shutil.copy2(p3, os.path.join(RELEASES_DIR, "pack3_directory_monetization_checkout_kit_v1.0.zip"))
print("Aliased: pack3_directory_monetization_checkout_kit_v1.0.zip")

# Master Suite (Parent and Auditor variants)
p_master = create_zip("directory_engine_master_suite_v1.0.zip", [
    "engine/clinical_directory",
    "engine/ai_tools_directory",
    "monetization_directory_kit",
    "showcase",
    "assets",
    "CATALOG.md",
    "README.md",
    "DEPLOYMENT_GUIDE.md",
    "SEO_OPTIMIZATION_GUIDE.md",
    "LICENSE",
    "GUMROAD_LISTING.md"
])
shutil.copy2(p_master, os.path.join(RELEASES_DIR, "directory_sites_engine_master_suite_v1.0.zip"))
shutil.copy2(p_master, os.path.join(RELEASES_DIR, "production_directory_sites_engine_master_suite_v1.0.zip"))
print("Aliased: directory_sites_engine_master_suite_v1.0.zip and production_directory_sites_engine_master_suite_v1.0.zip")

print("All release archives packaged successfully!")
